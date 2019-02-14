import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default (props) => {

  return (
    <span>
    <FontAwesomeIcon icon="file" />
    {props.name}
    </span>
  );

};