/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 */
import { app, ipcMain, BrowserWindow } from 'electron';
import MenuBuilder from './menu';
import log from 'electron-log';
import { autoUpdater } from "electron-updater";
import {startServer} from './server';
import { listenForNetworkScanner } from './background/network-scanner';


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

log.info('App starting...');
var shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
  // Someone tried to run a second instance, we should focus our window.
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore();
    myWindow.focus();
  }
});

if (shouldQuit) {
  app.quit();
}
// import settings from 'electron-settings';
app.commandLine.appendSwitch('--enable-viewport-meta', 'true');
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
  startServer();
  listenForNetworkScanner();
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

  mainWindow = new BrowserWindow({
    // show: false,
    frame: (process.platform !== 'darwin') ? true : false,
    titleBarStyle: (process.platform !== 'darwin') ? null : "hiddenInset",
    // titleBarStyle: 'hiddenIn set',
    backgroundColor: "#000000",
    // width: 540,
    // height: 640,
    // maxWidth: 540,
    // maxHeight: 640,
    minWidth: 540,
    minHeight: 640
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);
  
  // mainWindow.on('resize', () => {
    // console.log(store.get('windowBounds'));
    // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
    // the height, width, and x and y coordinates.
    // let { width, height } = mainWindow.getBounds();
    // Now that we have them, save them using the `set` method.
    // settings.set('windowBounds', { width, height });
  // });
  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});
