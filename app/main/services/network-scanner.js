const IpUtil = require("ip");
const evilscan = require('evilscan');
const networkActions = require('../../actions/network_connection_actions');
const types = require('../../constants/network_scanner_action_types');
// const zerorpc = require("zerorpc");
const find = require('local-devices');
// const isPortReachable = require('is-port-reachable');
// const netList = require("network-list");

let totalGroups = 0;
let groupsScanned = 0;
let totalIps = 0;
let ipsScanned = 0;
var log = require('electron-log');
const chalk = require('chalk');
const prefix = chalk.bold.blue;
const bgTaskColor = chalk.yellow;

function writeLog(...params) {
  console.info(prefix('workbench') + ' ' + chalk.bold(bgTaskColor('[SCANNER]')), bgTaskColor(...params));
}

async function scanNode(ip,io) {
  let result;
  // writeLog("Scanning ip",ip);
  // const ipToScan = ip.replace("/24","").split(".").slice(0,3).join(".");
  // console.log("ipToScan:",ipToScan);
  writeLog("ip:",ip);
  try {
    result = await verifyPort(ip,io);
  } catch(e) {
    console.log(`ERROR Scanning ${ip}`,e)
  }
}
function flatten(input) {
  const stack = [...input];
  const res = [];
  while (stack.length) {
    // pop value from stack
    const next = stack.pop();
    if (Array.isArray(next)) {
      // push back array items, won't modify the original input
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  //reverse to restore input order
  return res.reverse();
}

const verifyPort = (ip,io) => {
  writeLog(`[${ip}] Group start.`);
  return new Promise((resolve, reject) => {
    const scanner = new evilscan({
      target: ip,
      port:'8022',
      status:'TROU'
    });
    scanner.on('result', (data) => {
      ipsScanned++;
      writeLog(`[${data.ip}] ${ipsScanned}/${totalIps}`);
      if (data.status === "open") {
        writeLog(`Found EON: ${JSON.stringify(data)}`);
        io.emit(types.SCAN_NETWORK_RESULT,data);
      } else {
        // reject("Port not open...");
      }
    });
    scanner.on('error', (err) => {
      ipsScanned++;
      writeLog(`ips ${ipsScanned}/${totalIps}`);
      // writeLog('Error:',err);
      // writeLog(`[${ip}] Failed to scan ${ip}...`, err);
      reject(err);
    });

    scanner.on('done', (data) => {
      groupsScanned++;
      writeLog(`groups ${groupsScanned}/${totalGroups}`);
      io.emit(types.SCAN_NETWORK_PARTIAL_COMPLETE);
      if (groupsScanned === totalGroups) {
        io.emit(types.SCAN_NETWORK_COMPLETE);
      }
      resolve(data);
      // resolve();
    });

    scanner.run();
  });
};

const scanNetwork = async (io) => {
  const ip = IpUtil.address();
  let ips = [];
  let ipRange = networkActions.getIpsForScan(ip);
  console.log("iprange:",ipRange);
  ips = ips.concat(networkActions.getIpList(ipRange[1]+'.0',ipRange[2]+'.0'));
  totalGroups = ips.length;
  totalIps = ips.length*255;
  groupsScanned = 0;
  ipsScanned = 0;
  for (const ip of ips) {
    // console.log("scanning",ip);
    scanNode(ip, io);
  }
};



function start() {
  const port = 12000;
  const app = require('express')();
  const http = require('http').Server(app);
  const io = require('socket.io')(http);
  // writeLog("Initialized http/socket io");
  // writeLog("Starting Scanner Service...");
  io.on('connection', function(client) {
    // console.log("client");
    client.on(types.SCAN_NETWORK, () => { scanNetwork(io) });
  });

  http.listen(port);
  writeLog("Listening on port ", port);
}

start();
