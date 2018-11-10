
import { Notification } from 'electron';
import writeLog from './log';
/* global Notification */
/* eslint no-new:0 */
export default function notify(title, body) {
  if (process.platform === 'win32') {
    // const appId = 'ai.opc.workbench';
    // const {ToastNotification} = require('electron-windows-notifications');

    // let notification = new ToastNotification({
    //   appId,
    //   template: `<toast><visual><binding template="ToastText01"><text id="1">%s</text><text id="2">%s</text></binding></visual></toast>`,
    //   strings: [title,body]
    // });
    
    // notification.on('activated', () => writeLog(`Notification sent! ${title}: ${body}`))
    // notification.show();
  } else {
    const notify = new Notification({
      title,
      body
    });
    notify.show();
    writeLog(`Notification sent! ${title}: ${body}`);
  }
  
}
