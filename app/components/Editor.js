/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { Terminal } from 'xterm';
import { remote, clipboard } from 'electron';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import settings from 'electron-settings';
const { app } = remote;
import path from 'path';
import * as uiActions from '../actions/ui_actions';
import MonacoEditor from 'react-monaco-editor';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: `# The Openpilot IDE

The idea is to have an SFTP connection to EON so you can make tweaks to OP code inline.

## What is this?
This is the future home of the Openpilot IDE.
A direct SFTP connection to EON and /data/openpilot so you can make your tweaks, commit your code, etc.`,
    }
  }
  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  onChange(newValue, e) {
    console.log('onChange', newValue, e);
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (<MonacoEditor
        language="markdown"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />);
    // return (<div></div>);
  }
}

export default Editor;