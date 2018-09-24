import settings from 'electron-settings';
const app = require('electron').remote.app
import * as types from '../constants/shell_task_action_types'
import * as shellActions from './shell_task_actions';
import * as commands from '../constants/commands.json';
// ACTION CREATORS

export function sendCommand(eon, command, commandArgs = []) {
  const privateKey = getPrivateKey();
  const sshClient = new SSH();
  // console.log("Connecting...");
  return sshClient.connect({
    host: eon.ip,
    username: 'root',
    port: 8022,
    privateKey: privateKey
  }).then(() => {
    return sshClient.execCommand(command, commandArgs, {
      cwd: '/'
    });
  });
}
export function BEGIN_install() {
  console.log("dispatched BEGIN_scanNetwork");

  return {
    type: types.INSTALL
  };
}