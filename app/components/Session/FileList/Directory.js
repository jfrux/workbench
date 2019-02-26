/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as FileListActions from '../../../actions/file_list_actions';
import FileList from './index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const propTypes = {
  name: PropTypes.string,
  filePath: PropTypes.string,
  files: PropTypes.array
};

class Directory extends React.Component {
  render() {
    const { filePath, name } = this.props;
    // const srcOpen = props.theme === 'dark' ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBgIVGxp6PAzXAAAAs0lEQVQoz4XRMWoCURgE4G8fu9HO1so2pNBTBNQTWKZPbZEzpEqbwkrBM5jFOnUQL6AhhDQhaYRAeCk2iOBbnamGmf9nYDiDzJ3BXs09Hgeib7t/9Wlx4BVmnjPRrcvk97bMiOjDFE1BQy7XEDTBAzlKa1f6Vjq+0LLRtbRVQNR241dM8MdTAGMh2aLwRjRMXle8JprX2q8C0a42cF+VrGfvdOAFNe0rzCBXukja7ybnlgZ/6rltujAhGeEAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDYtMDJUMjE6Mjc6MjYrMDI6MDAIaAqjAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA2LTAyVDIxOjI3OjI2KzAyOjAweTWyHwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=' :
    //                                           'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBgIVGjpYSR1eAAAAyUlEQVQoz4XRL0tDYRQG8N99uZZtoIIbti35CQSbYaDBRb+BrIrfwSArwtKsglmjbM1oMynGG2RhQRQ1OC5iuCvi+7LnlAPPc85z/rAEmQO7i/zTmZ//goEL62Bb2/Uf9sk8M1D3aC3Sfceph4AVJ94iMdEnaNn36lnTTE2pVDPTVChs6GTGLuXqiugSvXzhdhylg72ATdPEEbruGLvXSQjO5QHfCf+GuTJouErUH7qpDryaEIyqOW+9R+m2l+oXR7aigg9DX5bjF4fIMaNLBnRmAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA2LTAyVDIxOjI2OjU4KzAyOjAwvVAT2QAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNi0wMlQyMToyNjo1OCswMjowMMwNq2UAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC';
    // const srcClosed = props.theme === 'dark' ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBgIVGhiNKVy6AAAARElEQVQoz2NkEGCAgT8MXxiwgP9w+INBB1OakeE/Eu8SQzx+BQwMpxn6UPiRTGgaTBhk8JuAAZgYGEYVEKOAESm6sQIA6nkOebiEmT8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDYtMDJUMjE6MjY6MjQrMDI6MDBwNXC0AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA2LTAyVDIxOjI2OjI0KzAyOjAwAWjICAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=' :
    
    return (
      this.props.visible ?
      <div><span onClick={() => { console.log("clicked"); this.props.action() }}><FontAwesomeIcon icon="caret-down" /> {name}</span> <FileList directory={filePath} /></div>
      :
      <div><span onClick={() => { console.log("clicked"); this.props.action() }}><FontAwesomeIcon icon="caret-right" /> {name}</span></div>
    );
  }
};

Directory.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FileListActions, dispatch);
}

const mapStateToProps = (state, props) => {
  const { fileList } = state;
  const { directory } = props;
  const { openedDirectories, isVisible } = fileList;
  const visible = isVisible[props.filePath];
  const files = openedDirectories[directory];
  return {
    files,
    visible,
    openedDirectories,
    isVisible
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Directory);