// Packages
// import { icon } from '../constants/paths';
// import icon from '../../resources/icons/96x96.png';
const {app, dialog, Menu, nativeImage} = require('electron');
const { resolve } = require("path");
// Utilities
const {getConfig} = require('../settings');
const fileMenu = require('./menus/file');
const viewMenu = require('./menus/view');
const editMenu = require('./menus/edit');
const externalToolsMenu = require('./menus/external_tools');
const windowMenu = require('./menus/window');
const helpMenu = require('./menus/help');
const darwinMenu = require('./menus/darwin');
const { getDecoratedKeymaps } = require('../keymaps/decorators');
const { execCommand } = require('../commands');

const appName = app.getName();
const appVersion = app.getVersion();

let menu_ = [];

export function createMenu() {
  // console.warn("createMenu()");
  // We take only first shortcut in array for each command
  const allCommandKeys = getDecoratedKeymaps();
  const commandKeys = Object.keys(allCommandKeys).reduce((result, command) => {
    result[command] = allCommandKeys[command][0];
    return result;
  }, {});

  let updateChannel = 'stable';

  const showAbout = () => {
    // console.log(nativeImage);
    // const newIcon = nativeImage.createFromDataURL(icon);
    dialog.showMessageBox({
      title: `About ${appName}`,
      message: `${appName} ${appVersion} (${updateChannel})`,
      detail: `\nWith <3 jfrux\nCopyright © 2018`,
      buttons: [],
      // icon: newIcon
    });
  };
  // console.warn(commandKeys);
  const menu = [
    ...(process.platform === 'darwin' ? [darwinMenu(commandKeys, execCommand, showAbout)] : []),
    fileMenu(commandKeys, execCommand),
    editMenu(commandKeys, execCommand),
    viewMenu(commandKeys, execCommand),
    windowMenu(commandKeys, execCommand),
    externalToolsMenu(commandKeys, execCommand),
    helpMenu(commandKeys, showAbout)
  ];
  
  return menu;
};

export function buildMenu(template) {
  menu_ = Menu.buildFromTemplate(template);
  return menu_;
};
