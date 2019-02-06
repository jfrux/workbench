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
// import MonacoEditor from 'react-monaco-editor';
const data = {
  name: 'root',
  toggled: true,
  children: [
      {
          name: 'parent',
          children: [
              { name: 'child1' },
              { name: 'child2' }
          ]
      },
      {
          name: 'loading parent',
          loading: true,
          children: []
      },
      {
          name: 'parent',
          children: [
              {
                  name: 'nested parent',
                  children: [
                      { name: 'nested child 1' },
                      { name: 'nested child 2' }
                  ]
              }
          ]
      }
  ]
};
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// type your code...',
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
    // return (<div>
    //   <MonacoEditor
    //     width="800"
    //     height="600"
    //     language="javascript"
    //     theme="vs-dark"
    //     value={code}
    //     options={options}
    //     onChange={this.onChange}
    //     editorDidMount={this.editorDidMount}
    //   /></div>);
    return (<div></div>);
  }
}

export default Editor;