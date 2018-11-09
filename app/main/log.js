const chalk = require('chalk');
const prefix = chalk.bold.blue;
const bgTaskColor = chalk.white;

export default function writeLog(...params) {
  //eslint-disable-next-line no-console
  console.info(prefix('workbench') + ' ' + chalk.bold(bgTaskColor('[main]')), bgTaskColor(...params));
}