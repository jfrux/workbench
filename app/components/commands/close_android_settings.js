import React, { PureComponent } from 'react';
import TerminalCommand from './command';

class CloseAndroidSettings extends PureComponent {
  constructor(props) {
    super(props);
    this.name = "Android Settings > Close";
    this.description = "This closes the base-Android system settings. Use this after you use Launch Android Settings to return back to Openpilot.";
    this.commands = [
      "am force-stop com.android.settings"
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

export default CloseAndroidSettings;