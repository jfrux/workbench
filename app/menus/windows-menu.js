import viewMenu from './menus/view';
import editMenu from './menus/edit';
import externalToolsMenu from './menus/external_tools';
import fileMenu from './menus/file';
import windowMenu from './menus/window';
import helpMenu from './menus/help';
import { execCommand } from '../commands';
const { getDecoratedKeymaps } = require('../keymaps/decorators');
// const commandKeys = {};
const allCommandKeys = getDecoratedKeymaps();
const commandKeys = Object.keys(allCommandKeys).reduce((result, command) => {
  result[command] = allCommandKeys[command][0];
  return result;
}, {});
export default [
  fileMenu(commandKeys, execCommand),
  editMenu(commandKeys, execCommand),
  viewMenu(commandKeys, execCommand),
  externalToolsMenu(commandKeys, execCommand),
  helpMenu(commandKeys, execCommand)
]