import React, { PureComponent } from 'react';
import TerminalCommand from './command';

class TakeScreenshot extends PureComponent {
  constructor(props) {
    super(props);
    this.name = "Take Screenshot";
    this.description = "Snap a picture of the EON screen and save it to your computer.";
    this.requireSu = true;
    this.commands = [
      "mkdir -p /data/screenshots",
      "screencap -p /data/screenshots/screenshot.png"
    ];
  }

  render() { return(
    <TerminalCommand 
      name={this.name} 
      description={this.description} 
      requireSu={this.requireSu}
      commands={this.commands}
      {...this.props} />);
  }
}

export default TakeScreenshot;