import React, { PureComponent } from 'react';
import TerminalCommand from './command';
class InstallOpenpilot extends PureComponent {
  constructor(props) {
    super(props);
    this.name = "Install Openpilot";
    this.description = "It's not that difficult, but its nice sometimes to have some automation!";
    this.fields = [
      ["gitUrl", "Git URL", "textarea", "https://github.com/commaai/openpilot.git"],
      ["gitBranch", "Branch", "text", "release2"]
    ];
    this.commands = [
      "cd /data",
      "cp -rf ./openpilot ./openpilot.bak",
      "rm -rf ./openpilot",
      "git clone %gitUrl% openpilot",
      "cd openpilot",
      "git checkout %gitBranch%"
    ];
  }
  
  render() { return(
    <TerminalCommand 
      name={this.name} 
      description={this.description}
      fields={this.fields}
      commands={this.commands}
      {...this.props} />);
  }
}

export default InstallOpenpilot;