/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 */
import { app, BrowserWindow, shell, Menu, nativeImage } from 'electron';
const { createWindow } = app;
import electronSettings from 'electron-settings';
const notify = require('./utils/notify');
const fetchNotifications = require('./notifications');
import { startServer } from './background/server';
import { startScanner } from './background/network-scanner';
import { startStreamer } from './background/streamer';
import { startZmq } from './background/zmq';
import { autoUpdater } from "electron-updater";
const createRPC = require('./rpc');
const contextMenuTemplate = require('./contextmenu');
const AppMenu = require('./menus/menu');
import * as settings from './settings';
const {gitDescribe} = require('git-describe');
const isDev = (process.env.NODE_ENV === 'development');

const chalk = require('chalk');
const prefix = chalk.bold.blue;
const bgTaskColor = chalk.white;

app.setName("Workbench");

function writeLog(...params) {
  //eslint-disable-next-line no-console
  console.info(prefix('workbench') + ' ' + chalk.bold(bgTaskColor('[main]')), bgTaskColor(...params));
}

const checkSquirrel = () => {
  let squirrel;

  try {
    squirrel = require('electron-squirrel-startup');
    //eslint-disable-next-line no-empty
  } catch (err) {}

  if (squirrel) {
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit();
  }
};
process.env['APP_PATH'] = app.getAppPath();
// handle startup squirrel events
if (process.platform === 'win32') {
  // eslint-disable-next-line import/order
  const systemContextMenu = require('./system-context-menu');

  switch (process.argv[1]) {
    case '--squirrel-install':
    case '--squirrel-updated':
      systemContextMenu.add(() => {
        checkSquirrel();
      });
      break;
    case '--squirrel-uninstall':
      systemContextMenu.remove(() => {
        checkSquirrel();
      });
      break;
    default:
      checkSquirrel();
  }
}

writeLog('Starting Workbench');

/**
 * App Switches
 */
writeLog('Enabling Viewport Meta');
app.commandLine.appendSwitch('--enable-viewport-meta', 'true');
writeLog('Disabling Pinch to zoom');
app.commandLine.appendSwitch('disable-pinch');
writeLog('Disabling Chromium GPU blacklist');
app.commandLine.appendSwitch('ignore-gpu-blacklist');

if (isDev) {
  writeLog('Development Mode');

  // Override default appVersion which is set from package.json
  gitDescribe({customArguments: ['--tags']}, (error, gitInfo) => {
    if (!error) {
      app.setVersion(gitInfo.raw);
    }
  });
} else {
  //eslint-disable-next-line no-console
  writeLog('Production Mode');
}

let mainWindow;

/**
 * Add event listeners...
 */
app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  // if (process.platform !== 'darwin') {
    // serverProc.kill('SIGINT');
    app.quit();
  // }
});
app.on('ready', async () => {
  startStreamer();
  try {
    startServer();
  } catch (e) {
    console.log("Server could not be started.",e);
  }
  startScanner();
  startZmq();
});
app.on('ready', async () => {
  autoUpdater.checkForUpdatesAndNotify();
  settings.setup();
  // if (!settings.get("windowBounds")) {
    // settings.set("windowBounds", { width: 800, height: 800 })
  // }
  // console.log("Settings are stored in:\n" + settings.file());
  // let { width, height } = settings.get('windowBounds');

  // console.warn("width:",width);
  // console.warn("height:",height);
  // if (
  //   process.env.NODE_ENV === 'development' ||
  //   process.env.DEBUG_PROD === 'true'
  // ) {
  //   await installExtensions();
  // }
  const makeMenu = () => {
    const menu = AppMenu.createMenu(app.createWindow);
    
    // If we're on Mac make a Dock Menu
    if (process.platform === 'darwin') {
      const dockMenu = Menu.buildFromTemplate([
        {
          label: 'New Window',
          click() {
            app.createWindow();
          }
        }
      ]);
      app.dock.setMenu(dockMenu);
    }
  
    Menu.setApplicationMenu(AppMenu.buildMenu(menu));
  };
  // const newIcon = nativeImage.createFromDataURL(icon);
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hiddenInset',
    title: 'Workbench',
    // we want to go frameless on Windows and Linux
    frame: process.platform === 'darwin',
    transparent: process.platform === 'darwin',
    backgroundColor: '#000',
    // icon: newIcon,
    minWidth: 320,
    minHeight: 240
  });
  const rpc = createRPC(mainWindow);

  let webContents = mainWindow.webContents;
  
  rpc.on('init', () => {
    writeLog("rpc init");
    mainWindow.show();
    mainWindow.focus();
    // fetchNotifications(mainWindow);
  });
  rpc.on('exit', ({uid}) => {
    writeLog("rpc exit");
    // const session = sessions.get(uid);
    // if (session) {
    //   session.exit();
    // }
  });
  rpc.on('unmaximize', () => {
    writeLog("rpc unmaximize");
    mainWindow.unmaximize();
  });
  rpc.on('maximize', () => {
    writeLog("rpc maximize");
    mainWindow.maximize();
  });
  rpc.on('minimize', () => {
    writeLog("rpc minimize");
    mainWindow.minimize();
  });
  rpc.on('resize', ({uid, cols, rows}) => {
    writeLog("rpc resize");
    // const session = sessions.get(uid);
    // if (session) {
    //   session.resize({cols, rows});
    // }
  });
  rpc.on('data', ({uid, data, escaped}) => {
    writeLog("rpc data");
    // const session = sessions.get(uid);
    // if (session) {
    //   if (escaped) {
    //     const escapedData = session.shell.endsWith('cmd.exe')
    //       ? `"${data}"` // This is how cmd.exe does it
    //       : `'${data.replace(/'/g, `'\\''`)}'`; // Inside a single-quoted string nothing is interpreted

    //     session.write(escapedData);
    //   } else {
    //     session.write(data);
    //   }
    // }
  });
  rpc.on('open external', ({url}) => {
    writeLog("rpc open external");
    // shell.openExternal(url);
  });
  rpc.on('open context menu', selection => {
    writeLog("rpc open context menu");
    const {createWindow} = app;
    const {buildFromTemplate} = Menu;
    buildFromTemplate(contextMenuTemplate(createWindow, selection)).popup(mainWindow);
  });
  
  // Same deal as above, grabbing the window titlebar when the window
  // is maximized on Windows results in unmaximize, without hitting any
  // app buttons
  for (const ev of ['maximize', 'unmaximize', 'minimize', 'restore']) {
    mainWindow.on(ev, () => rpc.emit('windowGeometry change'));
  }
  rpc.win.on('move', () => {
    writeLog("rpc win on move");
    rpc.emit('move');
  });
  rpc.on('close', () => {
    writeLog("rpc close");
    mainWindow.close();
  });
  rpc.on('notify', ({title, body})  => {
    writeLog("rpc notify",title, body);
    notify(title, body);
  });
  rpc.on('command', command => {
    writeLog("rpc command",command);
    const focusedWindow = BrowserWindow.getFocusedWindow();
    execCommand(command, focusedWindow);
  });
  // const deleteSessions = () => {
  //   sessions.forEach((session, key) => {
  //     session.removeAllListeners();
  //     session.destroy();
  //     sessions.delete(key);
  //   });
  // };
  // we reset the rpc channel only upon
  // subsequent refreshes (ie: F5)
  // let i = 0;
  // mainWindow.webContents.on('did-navigate', () => {
  //   if (i++) {
  //     deleteSessions();
  //   }
  // });
  mainWindow.loadURL(`file://${__dirname}/app.html`);

  webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    webContents.setZoomFactor(1);
    webContents.setVisualZoomLevelLimits(1, 1);
    webContents.setLayoutZoomLevelLimits(0, 0);
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    }
  });

  mainWindow.rpc = rpc;

  mainWindow.on('closed', () => {
    writeLog("Window closed...");
    app.quit();
    mainWindow = null;
  });
  
  makeMenu();
});
