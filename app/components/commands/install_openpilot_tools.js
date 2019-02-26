import React, { PureComponent } from 'react';
import TerminalCommand from './command';
class InstallOpenpilotTools extends PureComponent {
  constructor(props) {
    super(props);
    this.name = "Install Openpilot Tools";
    this.description = "Installs Comma.ai Openpilot Tools for Replaying Drives";
    this.fields = [
      // ["gitUrl", "Git URL", "textarea", "https://github.com/commaai/openpilot.git"],
      // ["gitBranch", "Branch", "text", "release2"]
    ];
    this.commands = [
      "cd /data",
      "git clone https://github.com/commaai/openpilot_tools.git",
      "ln -s /data/openpilot_tools/ /data/openpilot/openpilot_tools"
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

export default InstallOpenpilotTools;
