const EventMessageCapnp = require('../../messages/event-capnp');
const types = require('../../constants/zmq_action_types');
const chalk = require("chalk");
const prefix = chalk.bold.blue;
var fp = require("find-free-port")

const throttle = require("lodash.throttle");
const bgTaskColor = chalk.magenta;
let data = {};
let current_address;
let connected = false;
let messagesReceived;
function writeLog(...params) {
  console.info(prefix('workbench') + ' ' + chalk.bold(bgTaskColor('[ZEROMQ]')), bgTaskColor(...params));
}

function onMessage(socket, event_message, service, cb) {
  let msg, jsonData, dataKeys, newData, msgResp;
  try {
    // msg = new EventMessageJson(event_message);
    // writeLog("Event Message",event_message);
    msg = new EventMessageCapnp(event_message);
    // writeLog("Received Event Message");
    // msg = event_message;
    // console.log(msg);
  } catch (e) {
    writeLog("ERROR: Failed to parse ZMQ Message.",e.message);
    return;
  }

  try {
    jsonData = JSON.parse(JSON.stringify(msg));
    // writeLog(`Parsed EventMessage to JSON`);
  } catch (e) {
    writeLog("ERROR: Failed to convert EventMessage to JSON", e.message, service, msg);
    return;
  }

  try {
    // writeLog(`Extracting ${service.key} from JSON...`,JSON.stringify(jsonData));
    // let serviceKeys = Object.keys(jsonData);
    jsonData = jsonData[service.key];
    // console.log(JSON.stringify(jsonData));
  } catch (e) {
    writeLog(`ERROR: Failed to extract key ${service.key} from JSON`, e.message, service, jsonData);
  }

  newData = {};

  if (jsonData) {
    // writeLog("Compiling data for emitting");
    if (service.id === "logMessage") {
      jsonData = JSON.parse(jsonData);
    }

    dataKeys = Object.keys(jsonData);
    newData[service.id] = {
      fields: dataKeys,
      latestMessage: jsonData
      // messages: [
      //   ...data[service.id].messages,
      //   jsonData
      // ]
    };
    // writeLog(`${service.id} messages received: ${data[service.id].messages.length}`);

    // newData = {};
    // newData[service.id] = data[service.id];
  }
  messagesReceived = messagesReceived + 1;
  // writeLog(`[${messagesReceived}] Sent message to client...`, JSON.stringify(newData));
  socket.emit(types.MESSAGE, newData);
};

const onConnect = (socket, zmqSocket, ip, service) => {
  // const { sender } = evt;
  // writeLog("[ZMQ] CONNECT EVENT RECEIVED");
  messagesReceived = 0;
  if (!service) return;
  if (connected) {
    zmqSocket.disconnect(current_address);
  }
  // writeLog(`Received ${ip} ${JSON.stringify(service)}`);
  current_address = `tcp://${ip}:${service.port}`;
  if (service && service.id) {
    if (!data[service.id]) {
      data[service.id] = {
        latestMessage: {},
        messages: []
      };
    }

    data[service.id].messages = [];
    let msgHandler = throttle((msg) => { return onMessage(socket, msg, service); }, 200, { leading: true });
    // let msgHandler = (msg) => {
    //   return onMessage(socket, msg, service);
    // };

    zmqSocket.on('message', msgHandler);

    try {
      zmqSocket.connect(current_address);
      writeLog(`Connected to ZMQ channel ${service.id} on ${addr}`);
      connected = true;

    } catch (e) {
      writeLog('[ERROR]',e.message);
    }
  }
};

const onDisconnect = (io, zmqSocket, ip, service) => {
  // writeLog("[ZMQ] DISCONNECT EVENT RECEIVED");
  // const addr = `tcp://${ip}:${service.port}`;
  zmqSocket.removeListener('message', msgHandler);
  try {
    // writeLog(`Disconnect from ${addr}`, service.id);
    zmqSocket.disconnect(current_address);
    connected = false;
  } catch (e) {
    writeLog('[ERROR]',e.message);
  }
};

const start = async () => {
  const freep = await fp(12000, 12100);
  const port = freep[0];
  writeLog("Free ports found",port);
    /**
     * SOCKET IO SETUP
     */
    const app = require('express')();
    const http = require('http').Server(app);
    const io = require('socket.io')(http);
    writeLog("Initialized http/socket io");

    /**
     * ZMQ SERVICE
     */
    const zmq = require('zeromq');
    const zmqSocket = zmq.socket('sub');
    zmqSocket.subscribe('');
    writeLog("Initialized zmq socket.");

    io.on('connection', function(client) {
      client.on(types.CONNECT, (ip, service) => {onConnect(io, zmqSocket,ip,service)});
      client.on(types.DISCONNECT, (ip, service) => {onDisconnect(io, zmqSocket,ip,service)});
    });

    http.listen(port);
    writeLog("Listening on port ", port);
};

start();
