import settings from 'electron-settings';
import * as commandExists from 'command-exists';

const shellExists = commandExists.sync;
const windowsShells = [
    "C:\\Windows\\System32\\bash.exe",
    "bash.exe",
    "C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
    "cmd.exe"
];

function getShells() {
  shells.filter((shell) => {
    console.warn('shell:',shell);
  });
}

export default (() => {
  const userConfig = settings.get('config');
  const env = process.env;
  let userShell;
  let shell;
  if (userConfig && userConfig.shell && (userConfig.shell+'').length > 0) {
    return userConfig.shell;
  } else {
    if (process.platform === 'darwin') {
      shell = userShell || env.SHELL || '/bin/bash';
    } else if (process.platform === 'win32') {
      // Tests commands on the operating system and sets the userConfig to use that shell.
      for (let i = 0; i < windowsShells.length; i++) {
        const testShell = windowsShells[i];

        if (shellExists(testShell)) {
          shell = testShell;
          break;
        }
      }
    } else {
      shell = env.SHELL || '/bin/sh';
    }
    settings.set("config.shell",shell);
    return shell;
  }
})();