const chalk = require('chalk');
const prefix = chalk.bold.blue;
const success = chalk.bold.green;
const failed = chalk.bold.red;
const mainColor = chalk.bold.white;
const bgTaskColor = chalk.white;

export function writeLog(...params) {
  //eslint-disable-next-line no-console
  console.info(prefix('workbench') + ' ' + mainColor('[MAIN]'), bgTaskColor(...params));
}
export function writeSuccess(...params) {
  //eslint-disable-next-line no-console
  console.info(prefix('workbench') + ' ' + mainColor('[MAIN]') + ' ' + success('[SUCCESS]'), bgTaskColor(...params));
}
export function writeFailed(...params) {
  //eslint-disable-next-line no-console
  console.info(prefix('workbench') + ' ' + mainColor('[MAIN]') + ' ' + failed('[FAILED]'), bgTaskColor(...params));
}