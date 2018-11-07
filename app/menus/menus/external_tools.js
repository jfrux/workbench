const {release} = require('os');
const {app, shell} = require('electron');

const {getAll} = require('../../settings');
const {arch, env, platform, versions} = process;
const {version} = require('../../package.json');

export default function(commands) {
  return {
    label: "Tools",
    submenu: [
      {
        label: `Vehicle Database`,
        click() {
          shell.openExternal('https://opc.ai/');
        }
      },
      {
        type: 'separator'
      },
      {
        label: `Explorer`,
        click() {
          shell.openExternal('https://my.comma.ai/');
        }
      },
      {
        label: `Cabana`,
        click() {
          shell.openExternal('https://cabana.comma.ai/');
        }
      },
      {
        label: `Comma.ai Slack`,
        click() {
          shell.openExternal('https://comma.slack.com/');
        }
      }
    ]
  };
};
