import React, { PureComponent } from 'react';
import TerminalCommand from './command';

class GetFingerprint extends PureComponent {
  constructor(props) {
    super(props);
    this.name = "Get Fingerprint";
    this.description = "Openpilot needs to successfully match the car's CAN messages.  This is called the fingerprint.  Executing this command can help you figure out if Openpilot sees your vehicle.";
    this.commands = [
      "cd /data/openpilot/selfdrive",
      "PYTHONPATH=/data/openpilot PREPAREONLY=1 /data/openpilot/selfdrive/debug/get_fingerprint.py"
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

export default GetFingerprint;