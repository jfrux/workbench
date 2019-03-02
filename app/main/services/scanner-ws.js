const path = require("path");
const IpUtil = require("ip");
const evilscan = require('evilscan');
const networkActions = require('../../actions/network_connection_actions');
const types = require('../../constants/network_scanner_action_types');
// const { console.log } = require(path.resolve(__dirname,'../log'));

let totalGroups = 0;
let groupsScanned = 0;
let totalIps = 0;
let ipsScanned = 0;

const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

async function scanNode(ip,ws) {
  // console.log("Scanning ip",ip);
  // const ipToScan = ip.replace("/24","").split(".").slice(0,3).join(".");
  // console.log("ipToScan:",ipToScan);
  console.log("ip:",ip);
  try {
    await verifyPort(ip,ws);
  } catch(e) {
    // console.log(`ERROR Scanning ${ip}`,e)
  }
}

const verifyPort = (ip,ws) => {
  console.log(`[${ip}] Group start.`);
  return new Promise((resolve, reject) => {
    const scanner = new evilscan({
      target: ip,
      port:'8022',
      status:'TROU'
    });
    scanner.on('result', (data) => {
      ipsScanned++;
      console.log(`[${data.ip}] ${ipsScanned}/${totalIps}`);
      if (data.status === "open") {
        console.log(`Found EON: ${JSON.stringify(data)}`);
        ws.send(JSON.stringify({type: types.SCAN_NETWORK_RESULT,payload: data}));
      } else {
        // reject("Port not open...");
      }
    });
    scanner.on('error', (err) => {
      ipsScanned++;
      console.log(`ips ${ipsScanned}/${totalIps}`);
      // console.log('Error:',err);
      // console.log(`[${ip}] Failed to scan ${ip}...`, err);
      reject(err);
    });

    scanner.on('done', (data) => {
      groupsScanned++;
      console.log(`groups ${groupsScanned}/${totalGroups}`);
      ws.send(JSON.stringify({type: types.SCAN_NETWORK_PARTIAL_COMPLETE}));
      if (groupsScanned === totalGroups) {
        ws.send(JSON.stringify({type: types.SCAN_NETWORK_COMPLETE}));
      }
      resolve(data);
      // resolve();
    });

    scanner.run();
  });
};

const scanNetwork = async (ws) => {
  const ip = IpUtil.address();
  let ips = [];
  let ipRange = networkActions.getIpsForScan(ip);
  // console.log("iprange:",ipRange);
  ips = ips.concat(networkActions.getIpList(ipRange[1]+'.0',ipRange[2]+'.0'));
  totalGroups = ips.length;
  totalIps = ips.length*255;
  groupsScanned = 0;
  ipsScanned = 0;
  for (const ip of ips) {
    // console.log("scanning",ip);
    scanNode(ip, ws);
  }
};

function start() {
  const port = 9020;

  // server = express(port);
  // console.log(`Initialized express server to port ${port}`);
  // httpServer = http.Server(server);
  // console.log(`Initialized httpServer `);
  // console.log(`Initialized socketio `);
  console.log("Starting Scanner Service...");

  wss.on('connection', function(ws) {
    // console.log("Connection received!");
    // console.log("client");
    ws.addEventListener("message",(msg) => {
      // console.log("received message",arguments;
      const parsedMsg = JSON.parse(msg.data);
      // console.log("Message type:",parsedMsg.type);
      switch (parsedMsg.type) {
        case types.SCAN_NETWORK:
          scanNetwork(ws);
          break;
      }
    });
  });

  server.listen(port, () => {
    // console.log(`Server started on port ${server.address().port} :)`);
  });
  // httpServer.listen(port);
}

console.log(`[SCANNER] Running start();`);
start();
console.log(`[SCANNER] Ran start();`);
