import React, { PureComponent } from 'react';
import TerminalCommand from './command';

class LaunchAndroidSettings extends PureComponent {
  constructor(props) {
    super(props);
    this.name = "Launch Android Settings";
    this.description = "This opens the base-Android system settings.  Allows you to change things that the EON interfaces do not.";
    this.commands = [
      "am start -a android.settings.SETTINGS"
    ];
  }
  render() { return(
    <TerminalCommand 
      name={this.name} 
      description={this.description} 
      commands={this.commands}
      {...this.props} />);
  }
}

export default LaunchAndroidSettings;