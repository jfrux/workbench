import zmq from 'zeromq';
import { ipcMain } from 'electron';
import * as types from '../../constants/zmq_action_types';
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;
const EventMessage = require('../../messages/event');
const chalk = require("chalk");
const prefix = chalk.bold.blue;
const bgTaskColor = chalk.magenta;
const data = {};
import throttle from "lodash.throttle";
function writeLog(...params) {
  console.info(prefix('workbench') + ' ' + chalk.bold(bgTaskColor('[zmq]')), bgTaskColor(...params));
}

function onMessage(sender, event_message, service, cb) {
  // console.warn(arguments);
  let msg, jsonData, dataKeys, newData, msgResp;
  try {
    writeLog("Translating ZMQ data...");
    msg = new EventMessage(event_message);
  } catch (e) {
    writeLog("ERROR: Failed to parse ZMQ Message.",e.message);
    return;
  }

  try {
    writeLog(`Converting EventMessage to JSON...`);
    jsonData = JSON.parse(JSON.stringify(msg));
  } catch (e) {
    writeLog("ERROR: Failed to convert EventMessage to JSON", e.message, service, msg);
    return;
  }
  
  try {
    writeLog(`Extracting ${service.key} from JSON...`);
    jsonData = jsonData[service.key];
  } catch (e) {
    writeLog(`ERROR: Failed to extract key ${service.key} from JSON`, e.message, service, jsonData);
  }
  newData = {};

  if (jsonData) {
    if (service.id === "logMessage") {
      jsonData = JSON.parse(jsonData);
    }

    dataKeys = Object.keys(jsonData);
    data[service.id] = {
      fields: dataKeys,
      latestMessage: jsonData,
      messages: [
        ...data[service.id].messages,
        jsonData
      ]
    };
    writeLog("message count: " + data[service.id].messages.length);
  
    msgResp = {};
    msgResp[service.id] = data[service.id];
  }

  sender.send(types.MESSAGE, msgResp);
}

export function startZmq() {
  return new Promise((resolve, reject) => {
    const sock = zmq.socket('sub');
    sock.subscribe('');
    
    let msgHandler;
    ipcMain.on(types.CONNECT, (evt, ip, service) => {
      const { sender } = evt;
      const addr = `tcp://${ip}:${service.port}`;
      if (service && service.id) {
        if (!data[service.id]) {
          data[service.id] = {
            latestMessage: {},
            messages: []
          };
        }
        // if (!data[service.id].messages) {
        //   data[service.id].messages = [];
        // }
        data[service.id].messages = [];
        writeLog('ServiceID:',service.id);
        writeLog('Service Key:',service.key);
        msgHandler = throttle((msg) => { return onMessage(sender, msg, service); }, 200, { leading: true });
        sock.on('message', msgHandler);
        writeLog(`Connecting to ${addr}`, service.id);
        sock.connect(addr);
      }
    });

    ipcMain.on(types.DISCONNECT, (evt, ip, service) => {
      const { sender } = evt;
      const addr = `tcp://${ip}:${service.port}`;
      sock.removeListener('message', msgHandler);
      writeLog(`Disconnect from ${addr}`, service.id);
      sock.disconnect(addr);
    });

    writeLog("Started ØMQ Service");
    resolve();
  });
}