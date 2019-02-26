import React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { FileTypeIconMapping, FileNameIconMapping, DARK, LIGHT } from '../../../constants/file_icon_mapping';
export default (props) => {
  let { size, extension, name, hidden, allowOpen } = props;
  let iconColor = DARK, iconName = "RawSource";
  if (hidden) {}
  if (!size) {
    size = 13;
  }
  if (!extension) {
    extension = 'none';
  }
  let icon = FileTypeIconMapping[extension];
  if (icon) {
    iconName = icon.name;
    iconColor = icon.color;
  }

  // if (!icon) {
  //   iconName = ;
  //   iconColor =
  // }
  
  let nameMapped = FileNameIconMapping[name];
  if (nameMapped) {
    icon = nameMapped;
    iconName = nameMapped.name;
    iconColor = nameMapped.color;
  }

  if (!allowOpen) {
    iconColor = DARK;
  }
  return (<Icon iconName={iconName} style={{color: iconColor, fontWeight: 'bold' }} />);
};