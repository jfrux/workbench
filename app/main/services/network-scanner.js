import IpUtil from "ip";
import evilscan from 'evilscan';
import * as networkActions from '../../actions/network_connection_actions';
import * as types from '../../constants/network_scanner_action_types';
import { ipcMain } from 'electron';

var log = require('electron-log');
const chalk = require('chalk');
const prefix = chalk.bold.blue;
const bgTaskColor = chalk.yellow;

function writeLog(...params) {
  console.info(prefix('workbench') + ' ' + chalk.bold(bgTaskColor('[SCANNER]')), bgTaskColor(...params));
}

function scanNetwork(sender) {
  // writeLog("Started scan...");
  const ip = IpUtil.address();
  let ips = [];
  let ipRange = networkActions.getIpsForScan(ip);
  ips = ips.concat(networkActions.getIpList(ipRange[1]+'.0',ipRange[2]+'.0'));
  // let ipsLength = ips.length*256;
  return Promise.all(ips.map((ip) => {
    // writeLog(`Scanning ${ip}`);
    return new Promise((resolve, reject) => {
      const scanner = new evilscan({
        target: ip,
        port:'8022',
        status:'O'
      });
      scanner.on('result', (data) => {
        if (data.status === "open") {
          writeLog("Found EON at ", data.ip);
          sender.send(types.SCAN_NETWORK_RESULT,data);

          writeLog(`Found open port on ${ip}`);
        }
      });
      scanner.on('error', (err) => {
        // writeLog('Error:',err);
        writeLog(`Failed to scan ${ip}...`, err);
        reject(err);
      });
      scanner.on('done', (data) => {
        // writeLog('IP Group Complete');
        writeLog(`Completed scanning ${ip}`);
        sender.send(types. SCAN_NETWORK_PARTIAL_COMPLETE);
        resolve();
      });

      scanner.run();
    });
  }));
}

const start = async () => {
    const freep = await fp(12000, 12100);
    const port = freep[0];

    /**
     * SOCKET IO SETUP
     */
    const app = require('express')();
    const http = require('http').Server(app);
    const io = require('socket.io')(http);

    writeLog("Initialized http/socket io");
    io.on('connection', function(client) {
      client.on(types.SCAN_NETWORK,() => {
        // writeLog(`Received ${types.SCAN_NETWORK}`);
        scanNetwork(client).then((results) => {
          // writeLog("Completed scan.");
          client.emit(types.SCAN_NETWORK_COMPLETE,results);
        }).catch((err) => {
          // writeLog("Scan Failed!",err);
          client.emit(types.SCAN_NETWORK_FAIL,err);
        });
      });
    });

    resolve();
    // writeLog("Scanner Service Started!");
};

start();
