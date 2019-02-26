/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 */
const { fork } = require('child_process');
import { requireTaskPool } from 'electron-remote';
import { writeLog, writeFailed, writeSuccess} from './main/log';
import { app, BrowserWindow, shell, Menu, nativeImage } from 'electron';
import Analytics from 'electron-google-analytics';
const uuidv1 = require('uuid/v1');
const { version } = require('./package.json');
import debounce from "lodash.debounce";

import { autoUpdater } from "electron-updater";
import path from 'path';

require('electron-debug')({ showDevTools: process.env.NODE_ENV === 'development' })
writeLog('Starting Workbench');

const AppMenu = require('./menus/menu');
const {gitDescribe} = require('git-describe');
const isDev = (process.env.NODE_ENV === 'development');

app.setName("Workbench");

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
  writeLog("Ready.");
  let analytics;
  try {
    analytics = new Analytics('UA-122297332-4', { userAgent: `workbench-${version}` });
  } catch (e) {
    writeLog(`Failed to initialize analytics...`)
    writeLog(e);
  }
  app.analytics = analytics;
  const electronSettings = require('electron-settings');
  const settings = require('./settings');
  if (!electronSettings.get("windowBounds")) {
    electronSettings.set("windowBounds", { width: 800, height: 800 })
  }

  if (!electronSettings.get("clientId")) {
    electronSettings.set("clientId",uuidv1());
  }
  try {
    analytics.set('uid', electronSettings.get("clientId"));
    app.clientId = electronSettings.get("clientId");
  } catch (e) {
    writeLog(`Failed to set uid and clientId for analytics...`)
    writeLog(e);
  }
  let { width, height } = electronSettings.get('windowBounds');
  writeLog("Setting Window Properties");
  let windowOpts = {
    titleBarStyle: 'hiddenInset',
    title: 'Workbench',
    // we want to go frameless on Windows and Linux
    frame: process.platform === 'darwin',
    transparent: process.platform === 'darwin',
    backgroundColor: '#000',
    width,
    height,
    minWidth: 320,
    minHeight: 240,
    webPreferences: {
      // nativeWindowOpen: true,
      // nodeIntegrationInWorker: true
    }
  };
  try {
    analytics.event('App', 'open', { evLabel: 'opened-workbench', evValue: true, clientId: app.clientId });
    analytics.screen("workbench", version, "ai.opc.workbench", "ai.opc.workbench.installer", "loading", app.clientId);
  } catch(e) {
    writeLog(`Failed to send event / screen for analytics...`)
    writeLog(e);
  }
  writeLog("Setting Splash Properties");
  mainWindow = new BrowserWindow(windowOpts);
  writeLog("Checking for Updates...");
  autoUpdater.checkForUpdatesAndNotify();
  writeLog("Setting up config file");
  settings.setup();
  writeLog("Settings are located at " + electronSettings.file());

  const makeMenu = () => {
    const menu = AppMenu.createMenu(app.createWindow);

    Menu.setApplicationMenu(AppMenu.buildMenu(menu));
  };

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  let webContents = mainWindow.webContents;
  mainWindow.on('resize', debounce((msg) => {
    // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
    // the height, width, and x and y coordinates.
    let { width, height } = mainWindow.getBounds();
    writeLog("Resized window",{ width, height });
    // Now that we have them, save them using the `set` method.
    new Promise((resolve) => {
      electronSettings.set('windowBounds', { width, height });
    });
  }, 1000));

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

  mainWindow.on('closed', () => {
    writeLog("Window closed...");
    app.quit();
    mainWindow = null;
  });

  makeMenu();

  // const { startWsService } = require("./main/services/websocket");
  const { startShellService } = require("./main/services/shell");
  const { startNetworkScannerService } = require("./main/services/network-scanner");
  // const { startSftpService } = require("./main/services/sftp");
  const { startUiService } = require("./main/services/ui");
  // startStreamer().catch((e) => {
  //   writeLog("Streamer service could not be started.", e.message);
  // });
  // try {
  //   await startSftpService(mainWindow, app);
  //   writeSuccess('SFTP Service');
  // } catch (e) {
  //   writeFailed('SFTP Service', e)
  // }
  try {
    await startShellService(mainWindow, app);
    writeSuccess('Shell Service');
  } catch (e) {
    writeFailed('Shell Service', e)
  }
  try {
    await startUiService(mainWindow, app);
    writeSuccess('RPC Service');
  } catch (e) {
    writeFailed('RPC Service', e);
  }
  try {
    fork(path.resolve(__dirname, "./main/services/network-scanner"));
    // await startNetworkScannerService(mainWindow, app);
    writeSuccess('Network Scanner Service');
  } catch (e) {
    writeFailed('Network Scanner Service', e);
  }
  try {
    fork(path.resolve(__dirname, "./main/services/zmq"));
    writeSuccess('ZeroMQ Service');
  } catch (e) {
    writeFailed('ZeroMQ Service', e);
  }
  writeSuccess("All Services Started!");
});
