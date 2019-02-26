/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as FileListActions from '../../../actions/file_list_actions';
import Directory from './Directory';
import File from './File';

const propTypes = {
  directory: PropTypes.string,
  fileList: PropTypes.object,
  openedDirectories: PropTypes.object,
  isVisible: PropTypes.object,
  fileListLoading: PropTypes.bool
};

class FileList extends React.Component {
  componentDidMount() {
    const { directory } = this.props;
    console.log('filelist props');
    if (this.props.openedDirectories && this.props.openedDirectories[directory]) {
      console.log("already opened...");
      
    } else {
      console.log("not opened... fetching...");
      return directory && this.props && this.props.FETCH_DIRECTORY && this.props.FETCH_DIRECTORY(directory)
    }
  }
  componentDidUpdate(prevProps,props) {
    if (props && props.FETCH_DIRECTORY) {
      console.log("has fetch directory command");
    }
  }
  handleDirectoryClick = (file) => {
    console.log("Dispatching TOGGLE_VISIBILITY", file);
    this.props.TOGGLE_VISIBILITY(file.filePath);
    if ((this.props.openedDirectories && !this.props.openedDirectories[file.filePath]) || this.props.isVisible[file.filePath]) {
      
      return file.filePath && this.props.FETCH_DIRECTORY(file.filePath);
    }
  }
  onFileClick = (file) =>{
    return file.filePath && this.props.FETCH_FILE(file)
  }
  render() {
    const { filePath, isVisible, openedFiles, directory, files } = this.props;
    // console.log("files:", files);
    if (!files) {
      return (
        <ul className="file-tree" >
        <li>Loading...</li>
        </ul>
      )
    }
    return (
      files && files.length > 0 &&
      <ul className="file-tree" >
        {files.map(file => {
          const filePath = file.filePath;
          const fileName = file.name
          let fileClassName = "no-select";
          if (file.isDirectory) {
            fileClassName = `${fileClassName} directory`;
          } else {
            fileClassName = `${fileClassName} file`;
          }
          if (file.hidden) {
            fileClassName = `${fileClassName} hidden`;
          }
          if (file.allowOpen) {
            fileClassName = `${fileClassName} allowed`;
          }
          if (isVisible[file.filePath] || openedFiles[file.filePath]) {
            fileClassName = `${fileClassName} active`;
          }
          return file.isDirectory ?
            <li className={fileClassName} key={filePath + ' Directory'}>
                <Directory 
                  name={file.name}
                  action={() => this.handleDirectoryClick(file)}
                  filePath={file.filePath} />
            </li>
            :
            <li className={fileClassName} key={filePath} onClick={() => this.onFileClick(file)}>
              <File name={fileName} allowOpen={file.allowOpen} hidden={file.hidden} fileType={file.fileType} />
            </li>;
          })
        }
      </ul>
    );
  }
}

FileList.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FileListActions, dispatch);
}

const mapStateToProps = ({fileList}, {directory}) => {
  const { openedDirectories, isVisible, openedFiles } = fileList;
  const files = openedDirectories[directory];
  return {
    files,
    openedDirectories, 
    openedFiles,
    isVisible
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileList);