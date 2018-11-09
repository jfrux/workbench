/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 */
import writeLog from './main/log';
import { app, BrowserWindow, shell, Menu, nativeImage } from 'electron';
import * as Splashscreen from "@trodi/electron-splashscreen";
import electronSettings from 'electron-settings';
import * as settings from './settings';
import debounce from "lodash.debounce";
import { startServer } from './main/services/server';
import { startScanner } from './main/services/network-scanner';
import { startStreamer } from './main/services/streamer';
import { startZmq } from './main/services/zmq';
import { startRpc } from "./main/services/rpc";
import { autoUpdater } from "electron-updater";
import path from 'path';

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
  if (!electronSettings.get("config.windowBounds")) {
    electronSettings.set("windowBounds", { width: 800, height: 800 })
  }
  let { width, height } = electronSettings.get('windowBounds');
  writeLog("Setting Window Properties");
  let windowOpts = {
    titleBarStyle: 'hiddenInset',
    title: 'Workbench',
    frame: (process.platform === 'darwin'),
    transparent: (process.platform === 'darwin'),
    backgroundColor: '#000',
    width,
    height,
    minWidth: 320,
    minHeight: 240
  };
  writeLog("Setting Splash Properties");
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hiddenInset',
    title: 'Workbench',
    // we want to go frameless on Windows and Linux
    frame: process.platform === 'darwin',
    transparent: process.platform === 'darwin',
    backgroundColor: '#000',
    width,
    height,
    minWidth: 320,
    minHeight: 240
  });
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
      electronSettings.set('config.windowBounds', { width, height });
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
});
app.on('ready', async () => {
  // startStreamer().catch((e) => {
  //   writeLog("Streamer service could not be started.", e.message);
  // });
  try {
    startServer();
  } catch (e) {
    console.log("Server could not be started.", e.message);
  }
  startRpc(mainWindow, app);
  startScanner();
  startZmq();
});