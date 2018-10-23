/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { Terminal } from 'xterm';
import { remote, clipboard } from 'electron';
const { app } = remote;
import path from 'path';

// import * as attach from 'xterm/lib/addons/attach/attach';
import * as attach from '../addons/attach';
import * as fit from 'xterm/lib/addons/fit/fit';
import * as webLinks from 'xterm/lib/addons/webLinks/webLinks';
import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen';
import * as search from 'xterm/lib/addons/search/search';
import * as winptyCompat from 'xterm/lib/addons/winptyCompat/winptyCompat';
import processClipboard from '../utils/paste';

Terminal.applyAddon(attach);
Terminal.applyAddon(fit);
Terminal.applyAddon(webLinks);
Terminal.applyAddon(search);
Terminal.applyAddon(winptyCompat);

class ReactTerminal extends React.Component {
  constructor(props) {
    super(props);
    this.HOST = `127.0.0.1:9788`;
    this.SOCKET_URL = `ws://${this.HOST}/terminals/`;
    // this.elementId = `terminal_${ getId() }`;
    this.failures = 0;
    this.interval = null;
    this.fontSize = 16;
    this.onOpen = this.onOpen.bind(this);
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
    // we need to delay one frame so that styles
    // get applied and we can make an accurate measurement
    // of the container width and height
    requestAnimationFrame(() => {
      // at this point it would make sense for character
      // measurement to have taken place but it seems that
      // xterm.js might be doing this asynchronously, so
      // we force it instead
      // eslint-disable-next-line no-debugger
      //debugger;
      // this.term.charMeasure.measure(termOptions);
      this.fitResize();
    });
  }

  getTermDocument() {
    // eslint-disable-next-line no-console
    // console.warn(
    //   'The underlying terminal engine of Hyper no longer ' +
    //     'uses iframes with individual `document` objects for each ' +
    //     'terminal instance. This method call is retained for ' +
    //     "backwards compatibility reasons. It's ok to attach directly" +
    //     'to the `document` object of the main `window`.'
    // );
    return document;
  }

  onWindowResize() {
    this.fitResize();
  }

  // intercepting paste event for any necessary processing of
  // clipboard data, if result is falsy, paste event continues
  onWindowPaste(e) {
    if (!this.props.isTermActive) return;

    const processed = processClipboard();
    if (processed) {
      e.preventDefault();
      e.stopPropagation();
      this.term.send(processed);
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
  componentDidMount() {
    const {props} = this;
    this.term = new Terminal({
      cursorBlink: true,
      rows: 3,
      fontSize: this.fontSize
    });
    this.term.open(this.termRef);
    this.term.webLinksInit();
    this.term.winptyCompatInit();

    if (props.term) {
      //We need to set options again after reattaching an existing term
      Object.keys(this.termOptions).forEach(option => this.term.setOption(option, this.termOptions[option]));
    }
    if (this.props.isTermActive) {
      this.term.focus();
    }

    this.onOpen(this.termOptions);

    if (props.onTitle) {
      this.term.on('title', props.onTitle);
    }

    if (props.onActive) {
      this.term.on('focus', props.onActive);
    }

    if (props.onData) {
      this.term.on('data', props.onData);
    }

    if (props.onResize) {
      this.term.on('resize', ({cols, rows}) => {
        props.onResize(cols, rows);
      });
    }

    if (props.onCursorMove) {
      this.term.on('cursormove', () => {
        const cursorFrame = {
          x: this.term.buffer.x * this.term.renderer.dimensions.actualCellWidth,
          y: this.term.buffer.y * this.term.renderer.dimensions.actualCellHeight,
          width: this.term.renderer.dimensions.actualCellWidth,
          height: this.term.renderer.dimensions.actualCellHeight,
          col: this.term.buffer.y,
          row: this.term.buffer.x
        };
        props.onCursorMove(cursorFrame);
      });
    }

    window.addEventListener('resize', this.onWindowResize, {
      passive: true
    });

    window.addEventListener('paste', this.onWindowPaste, {
      capture: true
    });
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
    this.fitResize();
    this._connectToServer();

    // listenToWindowResize(() => {
    //   this.term.fit();
    // });
    // this.term.fit();
    // this.term.textarea.onkeydown = e => {
    //   console.log(e.keyCode, e.shiftKey, e.ctrlKey, e.altKey);
    //   // ctrl + shift + metakey + +
    //   if (
    //     (e.keyCode === 187 || e.keyCode === 61) &&
    //     e.shiftKey &&
    //     e.ctrlKey &&
    //     e.altKey
    //   ) {
    //     this.term.setOption('fontSize', ++this.fontSize);
    //     this.term.fit();
    //   }
    //   // ctrl + shift + metakey + -
    //   if (
    //     (e.keyCode === 189 || e.keyCode === 173) &&
    //     e.shiftKey &&
    //     e.ctrlKey &&
    //     e.altKey
    //   ) {
    //     this.term.setOption('fontSize', --this.fontSize);
    //     this.term.fit();
    //   }
    //   // ctrl + shift + metakey + v
    //   if (e.keyCode === 86 && e.shiftKey && e.ctrlKey && e.altKey) {
    //     this.props.options.splitVertical && this.props.options.splitVertical();
    //   }
    //   // ctrl + shift + metakey + h
    //   if (e.keyCode === 72 && e.shiftKey && e.ctrlKey && e.altKey) {
    //     this.props.options.splitHorizontal &&
    //       this.props.options.splitHorizontal();
    //   }
    //   // ctrl + shift + metakey + w
    //   if (e.keyCode === 87 && e.shiftKey && e.ctrlKey && e.altKey) {
    //     this.props.options.close && this.props.options.close();
    //   }
    // };
  }
  sendCommand(cmd) {
    this.socket.send(cmd);
  }
  componentWillUnmount() {
    clearTimeout(this.interval);
    this.socket.close();
    this.socket = null;
    ['title', 'focus', 'data', 'resize', 'cursormove'].forEach(type => this.term.off(type));

    window.removeEventListener('resize', this.onWindowResize, {
      passive: true
    });

    window.removeEventListener('paste', this.onWindowPaste, {
      capture: true
    });
  }
  render() {
    return (
      <div ref={this.onTermWrapperRef} className="term_fit term_wrapper">
      <div
        ref={this.onTermRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
      </div>
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
