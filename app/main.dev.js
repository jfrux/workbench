/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 */
import { ipcMain, app, BrowserWindow } from 'electron';
import MenuBuilder from './menu';
const cpus = require('os').cpus().length;
console.log('cpus: ' + cpus);


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

/*
======================
BACKGROUND JOB
PROCESSING
======================
*/

// stack of available background threads
var available = []

// queue of tasks to be done
var tasks = []

// hand the tasks out to waiting threads
function doIt() {
  while (available.length > 0 && tasks.length > 0) {
    var task = tasks.shift()
    available.shift().send(task[0], task[1])
  }
  renderer.webContents.send('status', available.length, tasks.length)
}

// Create a hidden background window
function createBgWindow() {
  result = new BrowserWindow({"show": true})
  result.loadURL('file://' + __dirname + '/background.html')
  result.on('closed', () => {
    console.log('background window closed')
  });
  return result
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  // if (process.platform !== 'darwin') {
    app.quit();
  // }
});

app.on('ready', async () => {
  // if (!settings.get("windowBounds")) {
  //   settings.set("windowBounds", { width: 800, height: 800 })
  // }
  // console.log("Settings are stored in:\n" + settings.file());
  // let { width, height } = settings.get('windowBounds');

  // console.warn("width:",width);
  // console.warn("height:",height);
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    // show: false,
    titleBarStyle: 'hiddenInset',
    backgroundColor: "#000000",
    width: 540,
    height: 640,
    maxWidth: 540,
    maxHeight: 640,
    minWidth: 540,
    minHeight: 640
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);
  
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

  // create background thread for each cpu
  for (var i = 0; i < cpus; i++) createBgWindow()

  ipcMain.on('ping', (event, arg1, arg2, arg3) => {
    console.log('Ping', arg1, arg2, arg3); // eslint-disable-line no-console
    event.sender.send('pong', arg1, arg2, arg3);
  });

  // Main thread can receive directly from windows
  ipcMain.on('to-main', (event, arg) => {
    console.log(arg)
  });

  // Windows can talk to each other via main
  ipcMain.on('for-renderer', (event, arg) => {
    renderer.webContents.send('to-renderer', arg);
  });
  ipcMain.on('for-background', (event, arg) => {
    tasks.push(['message', arg])
    doIt()
  });

  // heavy processing done in the background thread
  // so UI and main threads remain responsive
  ipcMain.on('assign-task', (event, arg) => {
    tasks.push(['task', arg])
    doIt()
  });

  ipcMain.on('ready', (event, arg) => {
    available.push(event.sender)
    doIt()
  })
});

