import { app, BrowserWindow, Menu } from 'electron';
import notify  from '../notify';
import RpcService from '../rpc-service';
const chalk = require('chalk');
const prefix = chalk.bold.blue;
const bgTaskColor = chalk.yellow;

function writeLog(...params) {
  console.info(prefix('workbench') + ' ' + chalk.bold(bgTaskColor('[RPC]')), bgTaskColor(...params));
}
const contextMenuTemplate = require('../../contextmenu');

export function startUiService(mainWindow, app) {
  // writeLog("Starting RPC Service...");
  return new Promise((resolve, reject) => {
    const uiService = new RpcService(mainWindow);
    uiService.on('init', () => {
      writeLog("uiService init");
      mainWindow.show();
      mainWindow.focus();
      // fetchNotifications(mainWindow);
    });

    uiService.on('exit', ({uid}) => {
      writeLog("uiService exit");
      // const session = sessions.get(uid);
      // if (session) {
      //   session.exit();
      // }
    });

    uiService.on('unmaximize', () => {
      writeLog("uiService unmaximize");
      mainWindow.unmaximize();
    });

    uiService.on('maximize', () => {
      writeLog("uiService maximize");
      mainWindow.maximize();
    });

    uiService.on('minimize', () => {
      writeLog("uiService minimize");
      mainWindow.minimize();
    });

    uiService.on('resize', ({uid, cols, rows}) => {
      writeLog("uiService resize");
      // const session = sessions.get(uid);
      // if (session) {
      //   session.resize({cols, rows});
      // }
    });

    uiService.on('data', ({uid, data, escaped}) => {
      // writeLog("uiService data");
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

    uiService.on('open external', ({url}) => {
      // writeLog("uiService open external");
      // shell.openExternal(url);
    });

    uiService.on('open context menu', selection => {
      const {createWindow} = app;
      // writeLog("uiService open context menu");
      const {buildFromTemplate} = Menu;
      buildFromTemplate(contextMenuTemplate(createWindow, selection)).popup(mainWindow);
    });

    // Same deal as above, grabbing the window titlebar when the window
    // is maximized on Windows results in unmaximize, without hitting any
    // app buttons
    for (const ev of ['maximize', 'unmaximize', 'minimize', 'restore']) {
      mainWindow.on(ev, () => uiService.emit('windowGeometry change'));
    }
    uiService.win.on('move', () => {
      writeLog("Window Moved");
      uiService.emit('move');
    });
    uiService.on('close', () => {
      writeLog("uiService close");
      mainWindow.close();
    });
    uiService.on('notify', ({title, body})  => {
      // writeLog("uiService notify", title, body);
      notify(title, body);
    });
    uiService.on('command', command => {
      writeLog("uiService command",command);
      const focusedWindow = BrowserWindow.getFocusedWindow();
      execCommand(command, focusedWindow);
    });

    // writeLog("Started RPC Service!");
    resolve(uiService);
  });
};