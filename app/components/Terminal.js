/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { Terminal } from 'xterm';
import { remote } from 'electron';
const { app } = remote;
import path from 'path';

// import * as attach from 'xterm/lib/addons/attach/attach';
import * as attach from '../addons/attach';
import * as fit from 'xterm/lib/addons/fit/fit';
import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen';
import * as search from 'xterm/lib/addons/search/search';
import * as winptyCompat from 'xterm/lib/addons/winptyCompat/winptyCompat';
// import { PORT } from '../../config';
// import getId from '../helpers/getId';

Terminal.applyAddon(attach);
Terminal.applyAddon(fit);
// Terminal.applyAddon(fullscreen);
Terminal.applyAddon(search);
Terminal.applyAddon(winptyCompat);

// const HOST = `127.0.0.1:${ PORT }`;

class ReactTerminal extends React.Component {
  constructor(props) {
    super(props);
    this.HOST = `127.0.0.1:9788`;
    this.SOCKET_URL = `ws://${this.HOST}/terminals/`;
    // this.elementId = `terminal_${ getId() }`;
    this.failures = 0;
    this.interval = null;
    this.fontSize = 16;
    this.state = {
      command: ''
    };
  }
  componentDidMount() {
    this.term = new Terminal({
      cursorBlink: true,
      rows: 3,
      fontSize: this.fontSize
    });
    this.term.open(this.container);
    this.term.winptyCompatInit();
    this.term.fit();
    this.term.focus();
    this.term.on('resize', ({ cols, rows }) => {
      if (!this.pid) return;
      fetch(
        `http://${this.HOST}/terminals/${
          this.pid
        }/size?cols=${cols}&rows=${rows}`,
        { method: 'POST' }
      );
    });
    this.term.decreaseFontSize = () => {
      this.term.setOption('fontSize', --this.fontSize);
      this.term.fit();
    };
    this.term.increaseFontSize = () => {
      this.term.setOption('fontSize', ++this.fontSize);
      this.term.fit();
    };
    this._connectToServer();

    listenToWindowResize(() => {
      this.term.fit();
    });
    this.term.fit();
    this.term.textarea.onkeydown = e => {
      console.log(e.keyCode, e.shiftKey, e.ctrlKey, e.altKey);
      // ctrl + shift + metakey + +
      if (
        (e.keyCode === 187 || e.keyCode === 61) &&
        e.shiftKey &&
        e.ctrlKey &&
        e.altKey
      ) {
        this.term.setOption('fontSize', ++this.fontSize);
        this.term.fit();
      }
      // ctrl + shift + metakey + -
      if (
        (e.keyCode === 189 || e.keyCode === 173) &&
        e.shiftKey &&
        e.ctrlKey &&
        e.altKey
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
  }
  sendCommand(cmd) {
    this.socket.send(cmd);
  }
  componentWillUnmount() {
    clearTimeout(this.interval);
    this.socket.close();
    this.socket = null;
  }
  render() {
    return (
      <div
        ref={ref => (this.container = ref)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
    );
  }
  _connectToServer() {
    fetch(
      `http://${this.HOST}/terminals/?cols=${this.term.cols}&rows=${
        this.term.rows
      }`,
      { method: 'POST' }
    ).then(
      res => {
        if (!res.ok) {
          this.failures += 1;
          if (this.failures === 2) {
            this.term.writeln(
              'There is back-end server found but it returns "' +
                res.status +
                ' ' +
                res.statusText +
                '".'
            );
          }
          this._tryAgain();
          return;
        }
        res.text().then(processId => {
          this.pid = processId;
          this.socket = new WebSocket(this.SOCKET_URL + processId);
          this.socket.onopen = () => {
            console.log('CONNECTED TO SHELL');
            this.term.attach(this.socket);
            console.warn(process.platform);
            if (process.platform === 'win32') {
              const userHome = app.getPath('home');
              const filePath = path.join(userHome, '.ssh', 'openpilot_rsa');
            }

            this.sendCommand(
              `ssh root@${this.props.eonIp} -p 8022 -i ~/.ssh/openpilot_rsa\r`
            );
          };
          this.socket.onclose = () => {
            this.term.writeln('Server disconnected!');
            this._connectToServer();
          };
          this.socket.onerror = () => {
            this.term.writeln('Server disconnected!');
            this._connectToServer();
          };
        });
      },
      error => {
        this.failures += 1;
        if (this.failures === 2) {
          this.term.writeln('A process failed to start properly.');
          this.term.writeln('> Restart Workbench and try again.');
        }
        console.error(error);
        this._tryAgain();
      }
    );
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
  options: PropTypes.object
};

function listenToWindowResize(callback) {
  var resizeTimeout;

  function resizeThrottler() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function() {
        resizeTimeout = null;
        callback();
      }, 66);
    }
  }

  window.addEventListener('resize', resizeThrottler, false);
}

export default ReactTerminal;
