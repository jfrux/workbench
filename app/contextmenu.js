const editMenu = require('./menus/menus/edit');
const fileMenu = require('./menus/menus/file');
const { execCommand } = require('./commands');
const separator = {type: 'separator'};
const config = require('./settings');
const { getDecoratedKeymaps } = require('./keymaps/decorators');
const notify = require('./main/notify');

const getCommandKeys = keymaps =>
  Object.keys(keymaps).reduce((commandKeys, command) => {
    return Object.assign(commandKeys, {
      [command]: keymaps[command][0]
    });
  }, {});

// only display cut/copy when there's a cursor selection
const filterCutCopy = (selection, menuItem) => {
  if (/^cut$|^copy$/.test(menuItem.role) && !selection) {
    return;
  }
  return menuItem;
};

module.exports = (createWindow, selection) => {
  const commandKeys = getCommandKeys(getDecoratedKeymaps());
  const _file = fileMenu(commandKeys, execCommand).submenu;
  const _edit = editMenu(commandKeys, execCommand).submenu.filter(filterCutCopy.bind(null, selection));
  return _edit.concat(separator, _file).filter(menuItem => !menuItem.hasOwnProperty('enabled') || menuItem.enabled);
};
