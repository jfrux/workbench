module.exports = (commands, execCommand) => {
  return {
    label: 'Plugins',
    submenu: [
      {
        label: 'Update',
        accelerator: commands['plugins:update'],
        click() {
          execCommand('plugins:update');
        }
      },
      {
        label: 'Install Workbench CLI command in PATH',
        click() {
          execCommand('cli:install');
        }
      },
      {
        type: 'separator'
      }
    ]
  };
};
