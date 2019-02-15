/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import * as FileListActions from '../../../actions/file_list_actions';
import FileIcon from '../FileList/FileIcon';
import {getOpenedFilesKeysSelector} from '../../../selectors/get_opened_files_keys';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MonacoEditor from 'react-monaco-editor';

const propTypes = {
  openedFileKeys: PropTypes.array,
  openedFiles: PropTypes.object,
  currentFile: PropTypes.object,
  activeFile: PropTypes.string
};

class EditorTabs extends React.PureComponent {
  handleClose = (evt,file) => {
    if (file.isDirty) {
      if (confirm("Are you sure you want to close without saving your changes?")) {
        this.props.CLOSE_FILE(file);
      }
    } else {
      this.props.CLOSE_FILE(file);
    }
  }
  render() {
    const { openedFileKeys, openedFiles, activeFile } = this.props;
    if (!openedFileKeys) return <div></div>;
    let tabsList = openedFileKeys.map((key,index) => {
      const file = openedFiles[activeFile];
      return <div className={classnames({
        "editor-tab": true,
        "no-select": true,
        active: activeFile === key
      })} key={index}>
        <FileIcon name={file.name} extension={file.fileType} hidden={file.hidden} allowOpen={file.allowOpen} /> {file.name} 
        {file.isDirty &&
          <FontAwesomeIcon icon="circle" onClick={(evt) => { this.handleClose(evt, file); }} />
        }
        {!file.isDirty &&
        <FontAwesomeIcon icon="times" onClick={(evt) => { this.handleClose(evt, file); }} />}
      </div>
    });
    return (
      <div className="editor-tabs">
        {tabsList}
      </div>
    );
  }
};

EditorTabs.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...FileListActions}, dispatch);
}

const mapStateToProps = ({fileList}) => {
  const { openedFiles, activeFile } = fileList;
  //Temporarily just doing one file at a time for proof of concept purposes.
  // Needs updated to work with tabs.
  // console.log(openedFiles);
  let openedFileKeys = getOpenedFilesKeysSelector(openedFiles);
  if (openedFileKeys.length === 0) return {};
  // let openedFilePath = openedFileKeys[0];
  // const openedFile = openedFiles[openedFilePath];
  // const { fileType, filePath, hidden, allowOpen, content, _original,isDirty, name } = openedFile;
  // console.log(openedFile);
  // if (!openedFile) return;
  return {
    openedFileKeys, openedFiles, activeFile
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorTabs);