import IpUtil from "ip";
import arp from 'node-arp';
import evilscan from 'evilscan';
import createRPC from '../rpc';
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

export function startScanner(mainWindow, app) {
  // writeLog("Starting Scanner Service...");
  return new Promise((resolve, reject) => {
    ipcMain.on(types.SCAN_NETWORK,(evt) => {
      // writeLog(`Received ${types.SCAN_NETWORK}`);
      const { sender } = evt;
      scanNetwork(sender).then((results) => {
        // writeLog("Completed scan.");
        sender.send(types.SCAN_NETWORK_COMPLETE,results);
      }).catch((err) => {
        // writeLog("Scan Failed!",err);
        sender.send(types.SCAN_NETWORK_FAIL,err);
      });
    });
    resolve();
    // writeLog("Scanner Service Started!");
  });
}