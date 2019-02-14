import defaultShell from '../default-shell';
var terminals = {};
var logs = {};
import getPort from 'get-port';
import { app as electronApp } from 'electron';
import * as types from '../../constants/eon_list_action_types';
const express = require('express');
const app = express();
const pty = require('ndb-node-pty-prebuilt');
const chalk = require('chalk');
const prefix = chalk.bold.blue;
const bgTaskColor = chalk.green;
function writeLog(...params) {
  console.info(prefix('workbench') + ' ' + chalk.bold(bgTaskColor('[terminal]')), bgTaskColor(...params));
}
module.exports = {
  startWsService() {
    return new Promise((resolve, reject) => {
      electronApp.TERMINAL_PORT = 12843;
      writeLog(`Listening for ${types.SELECT_EON}`);
      // ipcMain.on(types.SELECT_EON, (evt) => {
      //   const { sender } = evt;
      //   writeLog(`Received ${types.SELECT_EON} message from RPC.`);
      //   console.log("sending port", port);
      //   sender.send(types.SET_TERMINAL_PORT, port);
      // });
      const host = '127.0.0.1';

      const ALLOWED_ORIGINS = [
        '0.0.0.0',
        '127.0.0.1',
        'home.localhost',
        'chrome-extension://'
      ];

      app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');

        let origin = req.get('origin');
        let host = req.get('host');
        let foundOrigin = ALLOWED_ORIGINS.find(o => (origin && origin.indexOf(o) >= 0));
        let foundHost = ALLOWED_ORIGINS.find(h => (host && host.indexOf(h) >= 0));

        if (!foundOrigin && !foundHost) {
          res.status(403);
          res.send('Go away!');
          res.end();
          return;
        }
        next();
      });

      app.use('/', express.static(__dirname + '/../build'));

      require('express-ws')(app);

      app.post('/terminals', function (req, res) {
        let shell = defaultShell;
        writeLog("Using shell...",shell);
        let cols = parseInt(req.query.cols, 10);
        let rows = parseInt(req.query.rows, 10);
        let term = pty.fork(shell, [], {
          name: 'xterm-color',
          cols: cols || 80,
          rows: rows || 24,
          cwd: process.env.PWD,
          env: process.env
        });

        // term.write(`powershell.exe -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"\r`)
        writeLog('Created terminal with PID: ' + term.pid);
        terminals[term.pid] = term;
        logs[term.pid] = '';
        term.on('data', function (data) {
          logs[term.pid] += data;
        });
        res.send(term.pid.toString());
        res.end();
      });

      app.post('/terminals/:pid/size', function (req, res) {
        let pid = parseInt(req.params.pid, 10);
        let cols = parseInt(req.query.cols, 10);
        let rows = parseInt(req.query.rows, 10);
        let term = terminals[pid];

        term.resize(cols, rows);
        writeLog('Resized terminal ' + pid + ' to ' + cols + ' cols and ' + rows + ' rows.');
        res.end();
      });

      app.ws('/terminals/:pid', function (ws, req) {
        var term = terminals[parseInt(req.params.pid, 10)];

        if (!term) {
          ws.send('No such terminal created.');
          return;
        }

        writeLog('Connected to terminal ' + term.pid);
        ws.send(logs[term.pid]);

        term.on('data', function (data) {
          // writeLog('Incoming data = ' + data);
          try {
            ws.send(data);
          } catch (ex) {
            // The WebSocket is not open, ignore
          }
        });
        ws.on('message', function (msg) {
          term.write(msg);
        });
        ws.on('close', function () {
          term.kill();
          writeLog('Closed terminal ' + term.pid);
          // Clean things up
          delete terminals[term.pid];
          delete logs[term.pid];
        });
      });
      if (!port) {
        writeLog('ERROR: Please provide a port: node ./src/server.js --port=XXXX');
        process.exit(1);
        reject();
      } else {
        writeLog(`Started Terminal Service for ${port}`);
        try {
          resolve(app.listen(port, host));
          writeLog("Past resolve");
        } catch (e) {
          writeLog('ERROR: Could not start background/server...', e.message);
        }
      }
    });
    
  }
}