// const Reader = require('@commaai/log_reader');
// const fs = require('fs');
const chalk = require('chalk');
const prefix = chalk.bold.blue;
const bgTaskColor = chalk.yellow;

function writeLog(...params) {
  console.info(prefix('workbench') + ' ' + chalk.bold(bgTaskColor('[STREAMER]')), bgTaskColor(...params));
}
export function startStreamer() {
  writeLog("Starting Streamer Service...");
  return new Promise((resolve, reject) => {
    // var readStream = fs.createReadStream('/rlog--0 (1).bz2');
    // var reader = Reader(readStream);
    
    // reader(function (obj) {
    //   console.log('This is an Event message object', obj);
    // });
    writeLog("Started Streamer Service!");
    resolve();
  });
}