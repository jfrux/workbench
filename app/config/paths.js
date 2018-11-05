// This module exports paths, names, and other metadata that is referenced
const {homedir} = require('os');
const {statSync} = require('fs');
const {resolve, join} = require('path');
// const isDev = require('electron-is-dev');

const cfgFile = '.workbench.js';
const defaultCfgFile = 'config-default.js';
const homeDir = homedir();

let cfgPath = join(homeDir, cfgFile);
let cfgDir = homeDir;

const devDir = resolve(__dirname, '../..');
const devCfg = join(devDir, cfgFile);
let defaultCfg = resolve(__dirname, defaultCfgFile);
let keymapPath = resolve(__dirname, '../keymaps');
let icon = resolve(__dirname, '../resources/icons/96x96.png');
if (process.env.NODE_ENV === 'production') {
  defaultCfg = resolve(__dirname, './config', defaultCfgFile);
  keymapPath = resolve(__dirname,'./keymaps');
}
// if (isDev) {
//   console.warn("IS DEVELOPMENT");
// }

// if (!isDev) {
//   defaultCfg = resolve(__dirname, './config', defaultCfgFile);
// }
  // if a local config file exists, use it
try {
  statSync(devCfg);
  cfgPath = devCfg;
  cfgDir = devDir;
  //eslint-disable-next-line no-console
} catch (err) {
  // ignore
}

// const plugins = resolve(cfgDir, '.workbench_plugins');
// const plugs = {
//   base: plugins,
//   local: resolve(plugins, 'local'),
//   cache: resolve(plugins, 'cache')
// };


const darwinKeys = join(keymapPath, 'darwin.json');
const win32Keys = join(keymapPath, 'win32.json');
const linuxKeys = join(keymapPath, 'linux.json');

const defaultPlatformKeyPath = () => {
  switch (process.platform) {
    case 'darwin':
      return darwinKeys;
    case 'win32':
      return win32Keys;
    case 'linux':
      return linuxKeys;
    default:
      return darwinKeys;
  }
};

module.exports = {
  cfgDir,
  cfgPath,
  cfgFile,
  defaultCfg,
  icon,
  defaultPlatformKeyPath
};
