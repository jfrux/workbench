import * as networkActions from '../../actions/network_connection_actions';
import * as types from '../../constants/network_scanner_action_types';
import zmq from 'zmq';

var log = require('electron-log');
const chalk = require('chalk');
const prefix = chalk.bold.blue;
const bgTaskColor = chalk.yellow;

function writeLog(...params) {
  console.info(prefix('workbench') + ' ' + chalk.bold(bgTaskColor('[SCANNER]')), bgTaskColor(...params));
}

const frontend = zmq.socket('router')
const backend  = zmq.socket('dealer');

frontend.bindSync('tcp://*:5559');
backend.bindSync('tcp://*:5560');

frontend.on(types.SCAN_NETWORK, function({ type, payload }) {
  console.log("Received message")
  backend.send(args);
});

backend.on('message', function({ type, payload }) {
  var args = Array.apply(null, arguments);
  frontend.send(args);
});
