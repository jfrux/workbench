import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FileIcon from './FileIcon';
export default (props) => {

  return (
    <span>
    <FileIcon name={props.name} extension={props.fileType} hidden={props.hidden} allowOpen={props.allowOpen} />
    {props.name}
    </span>
  );

};