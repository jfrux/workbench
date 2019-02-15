/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as FileListActions from '../../../actions/file_list_actions';
import * as EonActions from '../../../actions/eon_detail_actions';
import FileIcon from '../FileList/FileIcon';
import {getOpenedFilesKeysSelector} from '../../../selectors/get_opened_files_keys';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MonacoEditor from 'react-monaco-editor';
import { debugOnlyWastedRenderDetector } from "wastedrendersdetector";
const propTypes = {
  file: PropTypes.any
};

class Editor extends React.PureComponent {
  editorDidMount = (editor, monaco) => {
    // console.log('editorDidMount', editor);
    editor.focus();
  }
  
  onChange = (evt, newValue)  => {
    // console.log('onChange', newValue, e);
    // console.log(this);
    this.props.UPDATE_CONTENT(this.props.filePath,newValue);
  }
  render() {
    const { fileType, name, content, hidden, allowOpen,  isDirty, _original } = this.props;
    const options = {
      selectOnLineNumbers: true,
      renderSideBySide: true
    };
    // console.log("rendering...");
    return (<div className="editor">
      {content && 
        <MonacoEditor
          language={"python"}
          theme="vs-dark"
          value={content}
          original={_original}
          options={options}
          onChange={(newValue, e) => this.onChange(e, newValue)}
          editorDidMount={this.editorDidMount}
        />
      }
      </div>);
    // return (<div></div>);
  }
}

Editor.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...FileListActions,...EonActions}, dispatch);
}

const mapStateToProps = ({fileList}) => {
  const { openedFiles } = fileList;
  //Temporarily just doing one file at a time for proof of concept purposes.
  // Needs updated to work with tabs.
  // console.log(openedFiles);
  let filesKeys = getOpenedFilesKeysSelector(openedFiles);
  if (filesKeys.length === 0) return {};
  let openedFilePath = filesKeys[0];
  const openedFile = openedFiles[openedFilePath];
  const { fileType, filePath, hidden, allowOpen, content, _original,isDirty, name } = openedFile;
  // console.log(openedFile);
  if (!openedFile) return;
  return {
    fileType, filePath, content, hidden, allowOpen, _original, isDirty, name
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(debugOnlyWastedRenderDetector(Editor));