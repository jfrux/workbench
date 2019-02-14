const RpcService = require("../rpc-service.js");
// const sftpService = require("../../common/sftp.js");
let Client = require('ssh2-sftp-client');
import * as types from '../../constants/sftp_action_types';
const chalk = require('chalk');
const prefix = chalk.bold.blue;
const bgTaskColor = chalk.yellow;

function writeLog(...params) {
  console.info(prefix('workbench') + ' ' + chalk.bold(bgTaskColor('[SFTP]')), bgTaskColor(...params));
}

export function startSftpService(mainWindow, app) {
  // writeLog("Starting Scanner Service...");
  return new Promise((resolve, reject) => {
    const sftpService = new RpcService(mainWindow);
    let conn;
    sftpService.on(types.SFTP_CONNECT, () => {
      conn = new Client();
      conn.connect({
          host: '127.0.0.1',
          port: '8080',
          username: 'username',
          password: '******'
      }).then(() => {
          return conn.list('/data/openpilot');
      }).then((data) => {
          console.log(data, 'the data info');
      }).catch((err) => {
          console.log(err, 'catch error');
      });
    });
    sftpService.on(types.LIST_DIRECTORY, () => {
      writeLog("sftpService list");
      // const session = sessions.get(uid);
      // if (session) {
      //   session.resize({cols, rows});
      // }
    });
    // console.log(sftpService);
    resolve();
    // writeLog("Scanner Service Started!");
  });
}