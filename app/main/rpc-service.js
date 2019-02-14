const {EventEmitter} = require('events');
const {ipcMain} = require('electron');
const uuid = require('uuid');

class RpcServer extends EventEmitter {
  constructor(win) {
    super();
    this.win = win;
    // this.win.services = this.win.services || {}
    this.ipcListener = this.ipcListener.bind(this);
    
    if (this.destroyed) {
      return;
    }

    this.id = uuid.v4();
    ipcMain.on(this.id, this.ipcListener);

    // we intentionally subscribe to `on` instead of `once`
    // to support reloading the window and re-initializing
    // the channel
    this.wc.on('did-finish-load', () => {
      this.wc.send('init', this.id);
    });

    // Register with the Window;
    // this.win.services[uid] = this;
  }

  get wc() {
    return this.win.webContents;
  }

  ipcListener(event, {ev, data}) {
    super.emit(ev, data);
  }

  emit(ch, data) {
    console.log("emit:",this.id, ch,data);
    this.wc.send(this.id, {ch, data});
  }

  destroy() {
    this.removeAllListeners();
    this.wc.removeAllListeners();
    if (this.type) {
      ipcMain.removeListener(this.id, this.ipcListener);
    } else {
      // mark for `genUid` in constructor
      this.destroyed = true;
    }
  }
}

module.exports = RpcServer;