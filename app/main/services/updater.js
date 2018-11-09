// function sendUpdateStatus(text) {
//   log.info(text);
//   mainWindow.webContents.send('update-message', text);
// }

// // AUTO UPDATER
// autoUpdater.on('checking-for-update', () => {
//   sendUpdateStatus('Checking for update...');
// })
// autoUpdater.on('update-available', (info) => {
//   sendUpdateStatus('Update available.');
// })
// autoUpdater.on('update-not-available', (info) => {
//   sendUpdateStatus('Update not available.');
// })
// autoUpdater.on('error', (err) => {
//   sendUpdateStatus('Error in auto-updater. ' + err);
// })
// autoUpdater.on('download-progress', (progressObj) => {
//   let log_message = "Download speed: " + progressObj.bytesPerSecond;
//   log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
//   log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
//   sendUpdateStatus(log_message);
// })
// autoUpdater.on('update-downloaded', (info) => {
//   sendUpdateStatus('Update downloaded');
// });