import React, { PureComponent } from 'react';
import TerminalCommand from './command';

class Reboot extends PureComponent {
  constructor(props) {
    super(props);
    this.name = "Reboot EON";
    this.description = "Will tell your EON to reboot.";
    this.fields = [];
    this.commands = [
      "reboot"
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

export default Reboot;