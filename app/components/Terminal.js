/* eslint-disable no-use-before-define */
import React from 'react';
import defaultShell from '../main/default-shell';
import PropTypes from 'prop-types';
import { Terminal } from 'xterm';
import electron from 'electron';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import settings from 'electron-settings';
import path from 'path';
import * as uiActions from '../actions/ui_actions';
import * as terminalActions from '../actions/terminal_actions';
import * as types from '../constants/terminal_action_types';
// import * as attach from 'xterm/lib/addons/attach/attach';
// import * as attach from '../addons/attach';
import * as fit from 'xterm/lib/addons/fit/fit';
import * as webLinks from 'xterm/lib/addons/webLinks/webLinks';
import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen';
import * as search from 'xterm/lib/addons/search/search';
import * as winptyCompat from 'xterm/lib/addons/winptyCompat/winptyCompat';
const fs = require('fs');
import processClipboard from '../utils/paste';
const { ipcRenderer, remote, clipboard } = electron;
const { app } = remote;

// Terminal.applyAddon(attach);
Terminal.applyAddon(fit);
Terminal.applyAddon(webLinks);
Terminal.applyAddon(search);
Terminal.applyAddon(winptyCompat);

class ReactTerminal extends React.Component {
  constructor(props) {
    super(props);
    this.HOST = `127.0.0.1:${app.TERMINAL_PORT}`;
    this.SOCKET_URL = `ws://${this.HOST}/terminals/`;
    this.failures = 0;
    this.interval = null;
    this.fontSize = 16;
    this.onOpen = this.onOpen.bind(this);
    this.handlePtyMessage = this.handlePtyMessage.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onWindowPaste = this.onWindowPaste.bind(this);
    this.onTermRef = this.onTermRef.bind(this);
    this.onTermWrapperRef = this.onTermWrapperRef.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.state = {
      command: ''
    };
  }
  onTermWrapperRef(component) {
    this.container = component;
  }
  onTermRef(component) {
    this.termRef = component;
  }
  onOpen(termOptions) {
    requestAnimationFrame(() => {
      this.fitResize();
    });
  }

  getTermDocument() {
    return document;
  }

  onWindowResize() {
    this.fitResize();
  }
  onWindowPaste(e) {
    console.warn('Pasted',e);
    let paste = (e.clipboardData || window.clipboardData).getData('text');
    if (e.path[0].className === 'xterm-helper-textarea') {
      this.sendCommand(paste);
    }
  }
  onMouseUp(e) {
    if (this.props.quickEdit && e.button === 2) {
      if (this.term.hasSelection()) {
        clipboard.writeText(this.term.getSelection());
        this.term.clearSelection();
      } else {
        document.execCommand('paste');
      }
    } else if (this.props.copyOnSelect && this.term.hasSelection()) {
      clipboard.writeText(this.term.getSelection());
    }
  }
  write(data) {
    this.term.write(data);
  }
  focus() {
    this.setState({
      focused: true
    });
    this.term.focus();
  }
  clear() {
    this.term.clear();
  }
  reset() {
    this.term.reset();
  }
  resize(cols, rows) {
    this.term.resize(cols, rows);
  }
  selectAll() {
    this.term.selectAll();
  }
  fitResize() {
    if (!this.termWrapperRef) {
      return;
    }
    this.term.fit();
  }
  keyboardHandler(e) {
    // Has Mousetrap flagged this event as a command?
    return !e.catched;
  }
  onContextMenu = (event, test) => {
    const targetClass = event.target.className;
    // console.warn("target",);
    if (targetClass === 'xterm-cursor-layer') {
      const selection = window.getSelection().toString();
      // const {props: {uid}} = this.getActiveTerm();
      console.warn('isTermActive:', this.props.isTermActive);
      this.props.OPEN_CONTEXTMENU(0, selection);
    }
  };
  componentDidMount() {
    const { props } = this;
    this.term = new Terminal({
      cursorBlink: true,
      // rows: 3,
      fontSize: this.fontSize
    });
    this.term.open(this.termRef);
    this.term.webLinksInit();
    this.term.winptyCompatInit();
    this.term.setOption('theme', { background: '#0e1011' });
    if (props.term) {
      //We need to set options again after reattaching an existing term
      Object.keys(this.termOptions).forEach(option =>
        this.term.setOption(option, this.termOptions[option])
      );
    }

    window.addEventListener('contextmenu', this.onContextMenu);

    window.addEventListener('resize', () => {
      this.term.fit();
    });

    window.addEventListener('resize', this.onWindowResize, {
      passive: true
    });

    window.addEventListener('paste', this.onWindowPaste, {
      capture: true
    });

    this.term.on('resize', ({ cols, rows }) => {
      if (!this.pid) return;
      ipcRenderer.send(types.TERMINAL_RESIZE,{ pid: this.pid, cols, rows });
    });

    this.term.decreaseFontSize = () => {
      this.term.setOption('fontSize', --this.fontSize);
      this.term.fit();
    };

    this.term.increaseFontSize = () => {
      this.term.setOption('fontSize', ++this.fontSize);
      this.term.fit();
    };
    this.fitResize();
    // this.term.attachCustomKeyEventHandler(this.keyboardHandler);
    // this.term._core.register(this.term.addDisposableListener('key', (key, ev) => {
    //   const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;
  
    //   if (ev.keyCode === 13) {
    //     this.term.prompt();
    //   } else if (ev.keyCode === 8) {
    //    // Do not delete the prompt
    //     if (this.term.x > 2) {
    //       this.term.write('\b \b');
    //     }
    //   } else if (printable) {
    //     this.term.write(key);
    //   }
    // }));
  
    // this.term._core.register(this.term.addDisposableListener('paste', (data, ev) => {
    //   this.term.write(data);
    // }));
    this.term.on('key', (key, ev) => {
      console.log(key.charCodeAt(0));
      if (key.charCodeAt(0) === 13)
        // this.sendCommand(`\n`);
      // this.setState({'command':`${this.state.command}${key}`});
      console.log(this.state.command);
      this.sendCommand(key);
    });
    this.term.textarea.onkeydown = e => {
      // console.log(e.keyCode, e.shiftKey, e.ctrlKey, e.altKey);
      // ctrl + shift + metakey + +
      if (
        (e.keyCode === 187 || e.keyCode === 61) &&
        e.metaKey || e.ctrlKey
      ) {
        this.term.setOption('fontSize', ++this.fontSize);
        this.term.fit();
      }
      // ctrl + shift + metakey + -
      if (
        (e.keyCode === 189 || e.keyCode === 173) &&
        e.metaKey || e.ctrlKey
      ) {
        this.term.setOption('fontSize', --this.fontSize);
        this.term.fit();
      }
      // ctrl + shift + metakey + v
      if (e.keyCode === 86 && e.shiftKey && e.ctrlKey && e.altKey) {
        this.props.options.splitVertical && this.props.options.splitVertical();
      }
      // ctrl + shift + metakey + h
      if (e.keyCode === 72 && e.shiftKey && e.ctrlKey && e.altKey) {
        this.props.options.splitHorizontal &&
          this.props.options.splitHorizontal();
      }
      // ctrl + shift + metakey + w
      if (e.keyCode === 87 && e.shiftKey && e.ctrlKey && e.altKey) {
        this.props.options.close && this.props.options.close();
      }
    };
    this._connectToServer();
  }
  sendCommand(cmd) {
    console.log(`Sending command to ${this.pid}...\n${cmd}`)
    ipcRenderer.send(types.TERMINAL_COMMAND,{ pid: this.pid, cmd });
    // this.setState({'command':``});
  }
  componentWillUnmount() {
    clearTimeout(this.interval);
    ipcRenderer.removeListener(types.TERMINAL_MESSAGE, this.handlePtyMessage);
    ipcRenderer.send(types.TERMINAL_DISCONNECT,{ pid: this.pid });
    this.pid = null;
    
    ['title', 'focus', 'data', 'resize', 'cursormove'].forEach(type =>
      this.term.off(type)
    );
    window.removeEventListener('contextmenu', this.onContextMenu);
    window.removeEventListener('resize', this.onWindowResize, {
      passive: true
    });
    window.removeEventListener('paste', this.onWindowPaste, {
      capture: true
    });
  }
  handlePtyMessage(evt, message) {
    this.term.write(message);
  }
  handlePtyError(evt, message) {
    this.term.write(message);
  }
  render() {
    const { activeCommand, CommandPane } = this.props;
    return (
      <div>
        {activeCommand && CommandPane && (
          <div className={'command-box'}>
            <CommandPane
              onRunCommand={command => {
                console.warn('Sending command: ', command);
                this.sendCommand(command);
              }}
            />
          </div>
        )}
        <div ref={this.onTermWrapperRef} className="term_fit term_wrapper">
          <div ref={this.onTermRef} />
        </div>
      </div>
    );
  }
  _connectToServer() {
    console.warn("Connecting to shell...",this.term);
    ipcRenderer.send(types.TERMINAL_CONNECT, {
      cols: this.term.cols,
      rows: this.term.rows
    });

    ipcRenderer.once(types.TERMINAL_CONNECTED,(evt,pid) => {
      const processId = pid;
      console.warn("Shell connected!", processId);
      this.pid = processId;
      
      console.warn(process.platform);
      let filePath;
      const userHome = app.getPath('home');
      filePath = path.join(userHome, '.ssh', 'openpilot_rsa');

      let userKeyPath = settings.get('eonSshKeyPath');
      if (userKeyPath) {
        filePath = userKeyPath;
      }

      this.sendCommand(`ssh root@${this.props.eonIp} -p 8022 -i "${filePath}"\r`);
      // this.socket.onclose = () => {
      //   this.term.writeln('Server disconnected!');
      //   this._connectToServer();
      // };
      // this.socket.onerror = error => {
      //   console.error(error);
      //   this.term.writeln('Critical error, restart Workbench!');
      //   this._connectToServer();
      // };
    });
    ipcRenderer.on(types.TERMINAL_MESSAGE, this.handlePtyMessage);
    // ipcRenderer.on(types.TERMINAL_ERROR, (evt, {error}) => {
    //   this.failures += 1;
    //   if (this.failures === 2) {
    //     this.term.writeln('A process failed to start properly.');
    //     this.term.writeln('> Restart Workbench and try again.');
    //   }
    //   console.error(error);
    //   this._tryAgain();
    // });
  }
  _tryAgain() {
    clearTimeout(this.interval);
    this.interval = setTimeout(() => {
      this._connectToServer();
    }, 2000);
  }
}

ReactTerminal.propTypes = {
  eonIp: PropTypes.string,
  options: PropTypes.object,
  activeCommand: PropTypes.string
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...uiActions,...terminalActions},dispatch);
}

const mapStateToProps = (state, ownProps) => {
  let activeCommand;

  if (state.eonDetail.activeCommand) {
    activeCommand = state.eonDetail.activeCommand;
  }
  return {
    activeCommand
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactTerminal);
