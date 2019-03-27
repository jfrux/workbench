import React, { PureComponent } from 'react';
import TerminalCommand from './command';
const { oneLine, stripIndents } = require('common-tags');
class UpdatePedalFirmware extends PureComponent {
  constructor(props) {
    super(props);
    this.name = "Update Pedal Firmware via CAN";
    this.description = stripIndents(`
      Updates the Comma Pedal firmware for Openpilot v0.5.10+ via CAN.

      IMPORTANT: This only needs to be performed if you have Comma Pedal installed in your vehicle.
      For flashing Pedal firmware via USB / Panda Paw, use different or different command.
      It requires that you be running Openpilot v0.5.10+ (2019-03-26) so if you're running an outdated fork,
      ensure your fork is running the latest version.
    `);

    this.commands = [
      "tmux kill-session -t comma",
      "cd /data/openpilot/panda/board/pedal",
      "PYTHONPATH=/data/openpilot && make"
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

export default UpdatePedalFirmware;
