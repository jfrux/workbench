import { app, BrowserWindow, Menu } from 'electron';
import notify  from '../notify';
import createRPC from '../rpc';
import writeLog from '../log';
const contextMenuTemplate = require('../../contextmenu');
export function startRpc(mainWindow, app) {
  const rpc = createRPC(mainWindow);
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
    // writeLog("rpc resize");
    // const session = sessions.get(uid);
    // if (session) {
    //   session.resize({cols, rows});
    // }
  });

  rpc.on('data', ({uid, data, escaped}) => {
    // writeLog("rpc data");
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
    // writeLog("rpc open external");
    // shell.openExternal(url);
  });

  rpc.on('open context menu', selection => {
    const {createWindow} = app;
    // writeLog("rpc open context menu");
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
    // writeLog("Window Moved");
    rpc.emit('move');
  });
  rpc.on('close', () => {
    // writeLog("rpc close");
    mainWindow.close();
  });
  rpc.on('notify', ({title, body})  => {
    // writeLog("rpc notify", title, body);
    notify(title, body);
  });
  rpc.on('command', command => {
    writeLog("rpc command",command);
    const focusedWindow = BrowserWindow.getFocusedWindow();
    execCommand(command, focusedWindow);
  });

  return rpc;
};