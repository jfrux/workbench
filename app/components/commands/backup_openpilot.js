import React, { PureComponent } from 'react';
import TerminalCommand from './command';

class BackupOpenpilot extends PureComponent {
  constructor(props) {
    super(props);
    this.name = "Backup Openpilot";
    this.description = "Copies your current openpilot installation to openpilot.bak.";
    
    this.commands = [
      "cd /data",
      "cp -rf ./openpilot ./openpilot.bak"
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

export default BackupOpenpilot;