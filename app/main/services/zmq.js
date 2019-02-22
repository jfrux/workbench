const EventMessageCapnp = require('../../messages/event-capnp');
const types = require('../../constants/zmq_action_types');
const { ipcRenderer } = require("electron");
const chalk = require("chalk");
const prefix = chalk.bold.blue;
const bgTaskColor = chalk.magenta;

function writeLog(...params) {
  console.info(prefix('workbench') + ' ' + chalk.bold(bgTaskColor('[ZEROMQ]')), bgTaskColor(...params));
}

function onMessage(sender, event_message, service, cb) {
  // console.warn(arguments);
  let msg, jsonData, dataKeys, newData, msgResp;
  try {
    // writeLog("Translating ZMQ data...");
    // msg = new EventMessageJson(event_message);
    msg = new EventMessageCapnp(event_message);
    // msg = event_message;
    // console.log(msg);
  } catch (e) {
    // writeLog("ERROR: Failed to parse ZMQ Message.",e.message);
    return;
  }

  try {
    // writeLog(`Converting EventMessage to JSON...`);
    jsonData = JSON.parse(JSON.stringify(msg));
    // console.log(jsonData);
  } catch (e) {
    // writeLog("ERROR: Failed to convert EventMessage to JSON", e.message, service, msg);
    return;
  }
  
  try {
    // writeLog(`Extracting ${service.key} from JSON...`,JSON.stringify(jsonData));
    // let serviceKeys = Object.keys(jsonData);
    jsonData = jsonData[service.key];
    console.log(JSON.stringify(jsonData));
  } catch (e) {
    // writeLog(`ERROR: Failed to extract key ${service.key} from JSON`, e.message, service, jsonData);
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
    // writeLog(`${service.id} messages received: ${data[service.id].messages.length}`);
  
    msgResp = {};
    msgResp[service.id] = data[service.id];
  }

  sender.send(types.MESSAGE, msgResp);
}

module.exports = function startZmqService(mainWindow, app) {
  writeLog("Starting ZeroMQ Service...");
  return new Promise((resolve, reject) => {
    const zmq = require('zeromq');
    const data = {};
    const sock = zmq.socket('sub');
    sock.subscribe('');
    
    let msgHandler;
    ipcRenderer.on(types.CONNECT, (evt, ip, service) => {
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
        // msgHandler = throttle((msg) => { return onMessage(sender, msg, service); }, 200, { leading: true });
        msgHandler = (msg) => { return onMessage(sender, msg, service); };
        sock.on('message', msgHandler);
        try {
          writeLog(`Connecting to ${addr}`, service.id);
          sock.connect(addr);
        } catch (e) {
          writeLog('[ERROR]',e.message);
        }
      }
    });

    ipcRenderer.on(types.DISCONNECT, (evt, ip, service) => {
      const { sender } = evt;
      const addr = `tcp://${ip}:${service.port}`;
      sock.removeListener('message', msgHandler);
      try {
        writeLog(`Disconnect from ${addr}`, service.id);
        sock.disconnect(addr);
      } catch (e) {
        writeLog('[ERROR]',e.message);
      }
    });

    // writeLog("Started ZeroMQ Service!");
    resolve();
  });
}