/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as EonActions from '../../../actions/eon_detail_actions';
import MonacoEditor from 'react-monaco-editor';
const propTypes = {
  file: PropTypes.any
};

class Editor extends React.Component {
  editorDidMount = (editor, monaco) => {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  onChange(newValue, e) {
    console.log('onChange', newValue, e);
  }
  render() {
    const { fileType, name, content } = this.props;
    const options = {
      selectOnLineNumbers: true
    };
    console.log("editorProps:",this.props);
    return (<div className="editor">
        <MonacoEditor
          language={"python"}
          theme="vs-dark"
          value={content}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
      </div>);
    // return (<div></div>);
  }
}

Editor.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonActions, dispatch);
}

const mapStateToProps = (state) => {
  const { fileList } = state;
  const { openedFiles } = fileList;
  //Temporarily just doing one file at a time for proof of concept purposes.
  // Needs updated to work with tabs.
  // console.log(openedFiles);
  let filesKeys = Object.keys(openedFiles);
  if (filesKeys.length === 0) return {};
  let openedFilePath = filesKeys[0];
  const openedFile = openedFiles[openedFilePath];
  // console.log("props:",openedFile);
  if (!openedFile) return;
  return {
    ...openedFile
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);