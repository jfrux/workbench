// const winston = require('winston');
// require('winston-syslog').Syslog;
// winston.add(new winston.transports.Syslog(options));
const log = require('electron-log');
log.transports.console.appName = 'Workbench';
log.transports.file.appName = 'Workbench';
log.transports.console.level = 'debug';
log.transports.file.level = 'debug';
log.transports.file.format = '{h}:{i}:{s}:{ms} {text}';

module.exports = {
  writeLog(...params) {
    log.info(`[MAIN]`, ...params);
  },
  writeSuccess(...params) {
    log.info(`[MAIN] [SUCCESS]`, ...params);
  },
  writeFailed(...params) {
    log.error(`[MAIN] [FAILED]`, ...params);
  }
};
