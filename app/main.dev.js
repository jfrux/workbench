/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 */
import { app, BrowserWindow, shell, Menu } from 'electron';
const { createWindow } = app;
import MenuBuilder from './menu';
import log from 'electron-log';
const notify = require('./notify');
const fetchNotifications = require('./notifications');
import { startServer } from './background/server';
import { startScanner } from './background/network-scanner';
import { startZmq } from './background/zmq';
import { autoUpdater } from "electron-updater";
const createRPC = require('./rpc');
const config = require('./config');
const plugins = require('./plugins');
const contextMenuTemplate = require('./contextmenu');
const toElectronBackgroundColor = require('./utils/to-electron-background-color');
const AppMenu = require('./menus/menu');
const {icon, cfgDir} = require('./config/paths');
const {gitDescribe} = require('git-describe');
const isDev = (process.env.NODE_ENV === 'development');
// set up config
config.setup();
app.config = config;
app.plugins = plugins;
const chalk = require('chalk');
const prefix = chalk.bold.blue;
const bgTaskColor = chalk.white;

function writeLog(...params) {
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

//-------------------------------------------------------------------
// Logging
//
// THIS SECTION IS NOT REQUIRED
//
// This logging setup is not required for auto-updates to work,
// but it sure makes debugging easier :)
//-------------------------------------------------------------------
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

writeLog('App starting...');

// import settings from 'electron-settings';
app.commandLine.appendSwitch('--enable-viewport-meta', 'true');
app.commandLine.appendSwitch('disable-pinch');
//eslint-disable-next-line no-console
writeLog('Disabling Chromium GPU blacklist');
app.commandLine.appendSwitch('ignore-gpu-blacklist');

if (isDev) {
  //eslint-disable-next-line no-console
  writeLog('Development Mode');

  // Override default appVersion which is set from package.json
  // gitDescribe({customArguments: ['--tags']}, (error, gitInfo) => {
  //   if (!error) {
  //     app.setVersion(gitInfo.raw);
  //   }
  // });
} else {
  //eslint-disable-next-line no-console
  writeLog('Production Mode');
}
let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

// const installExtensions = async () => {
//   const installer = require('electron-devtools-installer');
//   const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
//   const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

//   return Promise.all(
//     extensions.map(name => installer.default(installer[name], forceDownload))
//   ).catch(console.log);
// };

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
  autoUpdater.checkForUpdatesAndNotify();
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
    const menu = AppMenu.createMenu(createWindow);
    
    // If we're on Mac make a Dock Menu
    if (process.platform === 'darwin') {
      const dockMenu = Menu.buildFromTemplate([
        {
          label: 'New Window',
          click() {
            createWindow();
          }
        }
      ]);
      app.dock.setMenu(dockMenu);
    }
  
    Menu.setApplicationMenu(AppMenu.buildMenu(menu));
  };
  
  mainWindow = new BrowserWindow({
    // titleBarStyle: 'hidden-inset',
    title: 'Hyper.app',
    // we want to go frameless on Windows and Linux
    frame: process.platform === 'darwin',
    // transparent: process.platform === 'darwin',
    backgroundColor: '#000000',
    icon,
    minWidth: 320,
    minHeight: 240
  });
  const rpc = createRPC(mainWindow);
  let webContents = mainWindow.webContents;
  
  // const cfgUnsubscribe = app.config.subscribe(() => {
  //   const cfg_ = app.plugins.getDecoratedConfig();

  //   // notify renderer
  //   webContents.send('config change');

  //   // notify user that shell changes require new sessions
  //   if (cfg_.shell !== cfg.shell || JSON.stringify(cfg_.shellArgs) !== JSON.stringify(cfg.shellArgs)) {
  //     notify('Shell configuration changed!', 'Ensure you aren\'t connected to EON, and try connecting to EON again.');
  //   }

  //   // update background color if necessary
  //   // updateBackgroundColor();

  //   cfg = cfg_;
  // });
  rpc.on('init', () => {
    writeLog("rpc init");
    mainWindow.show();
    // updateBackgroundColor();

    // If no callback is passed to createWindow,
    // a new session will be created by default.
    // if (!fn) {
    //   fn = win => win.rpc.emit('termgroup add req');
    // }

    // app.windowCallback is the createWindow callback
    // that can be set before the 'ready' app event
    // and createWindow definition. It's executed in place of
    // the callback passed as parameter, and deleted right after.
    // (app.windowCallback || fn)(mainWindow);
    // delete app.windowCallback;
    fetchNotifications(mainWindow);
    // auto updates
    // if (!isDev) {
    //   updater(mainWindow);
    // } else {
    //   //eslint-disable-next-line no-console
    //   console.log('ignoring auto updates during dev');
    // }
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
  rpc.on('open hamburger menu', ({x, y}) => {
    writeLog("rpc open hamburger menu");
    Menu.getApplicationMenu().popup(Math.ceil(x), Math.ceil(y));
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
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.rpc = rpc;

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  startServer();
  startScanner();
  startZmq();
  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();
  makeMenu();
});
