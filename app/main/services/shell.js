import { app, BrowserWindow, Menu } from 'electron';
import defaultShell from '../default-shell';
import { ipcMain } from 'electron';
import * as eonListTypes from '../../constants/eon_list_action_types';
import * as types from '../../constants/terminal_action_types';
const pty = require('node-pty-prebuilt');
const chalk = require('chalk');
const prefix = chalk.bold.blue;
const bgTaskColor = chalk.green;
function writeLog(...params) {
  console.info(prefix('workbench') + ' ' + chalk.bold(bgTaskColor('[SHELL]')), bgTaskColor(...params));
}

let terminals = {};
let logs = {};

export function startShellService(mainWindow, app) {
  // writeLog("Starting Shell Service...");
  return new Promise((resolve, reject) => {
    // const rpc = createRPC(mainWindow);
    // rpc.on('init', () => {
    //   writeLog("Shell RPC Created...");
    //   // fetchNotifications(mainWindow);
    // });
    ipcMain.on(types.TERMINAL_CONNECT, (evt, { cols, rows }) => {
      const { sender } = evt;
      let shell = defaultShell;
      cols = parseInt(cols, 10);
      rows = parseInt(rows, 10);
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
        writeLog("Received data from pty...",data);
        logs[term.pid] += data;
        sender.send(types.TERMINAL_MESSAGE,data);
      });

      sender.send(types.TERMINAL_CONNECTED, term.pid.toString());
    });

    ipcMain.on(types.TERMINAL_RESIZE, (evt, {pid, cols, rows}) => {
      const { sender } = evt;
      pid = parseInt(pid, 10);
      const term = terminals[pid];
      cols = parseInt(cols, 10);
      rows = parseInt(rows, 10);

      term.resize(cols, rows);

      writeLog('Resized terminal ' + pid + ' to ' + cols + ' cols and ' + rows + ' rows.');
      // sender.send(types.TERMINAL_RESIZE_COMPLETE, term.pid.toString());
    });

    /**
     * TERMINAL COMMAND
     */
    ipcMain.on(types.TERMINAL_COMMAND, (evt, { pid, cmd }) => {
      writeLog(`Received ${types.TERMINAL_COMMAND}...\n${pid}\n${cmd}`)
      const { sender } = evt;
      pid = parseInt(pid, 10);
      const term = terminals[pid];
      term.write(cmd);
    });

    /**
     * TERMINAL DISCONNECT
     */
    ipcMain.on(types.TERMINAL_DISCONNECT, (evt, { pid }) => {
      const { sender } = evt;
      pid = parseInt(pid, 10);
      const term = terminals[pid];
      // term.kill();
      writeLog('Closed terminal ' + term.pid);
      // Clean things up
      delete terminals[term.pid];
      delete logs[term.pid];
    });

    // ipcMain.on(types.TERMINALS, (evt, { pid }) => {
    //   const { sender } = evt;
    //   const term = terminals[parseInt(pid, 10)];

    //   if (!term) {
    //     sender.send(types.TERMINAL_ERROR, 'No such terminal created.');
    //     return;
    //   }

    //   writeLog('Connected to terminal ' + term.pid);
    //   sender.send(logs[term.pid]);

    //   term.on('data', function (data) {
    //     writeLog('Incoming data = ' + data);
        
    //     // try {
    //     //   ws.send(data);
    //     // } catch (ex) {
    //     //   // The WebSocket is not open, ignore
    //     // }
    //   });
      
    // });

    // writeLog("Started Shell Service!");
    resolve();
  });
};