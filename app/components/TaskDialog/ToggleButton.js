import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Styles.scss';
import smalltalk from 'smalltalk';
import { Button, Modal } from 'reactstrap';
import * as eonListActions from '../../../../actions/eon_list_actions';
const propTypes = {
};

function mapStateToProps(state) {
  return {
    eon: state.eonList.scanResults[state.eonList.selectedEon]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(eonListActions, dispatch);
}

class TaskButton extends Component {
  handleButtonClick = () => {
    const regex = /\%([a-zA-Z0-9\_]+)\%/gm;
    let { shellCommand, eon, promptQuestion, promptPlaceholder } = this.props;
    let m;
    let cmdPromptKeys = [];
    while (( m = regex.exec(shellCommand)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      
      // The result can be accessed through the `m`-variable.
      cmdPromptKeys.push(m[1]);
    }
    
    // TODO: Replace with more robust form component that requests fields, has field validation, and default values.
    const cmdPrompts = Promise.all(cmdPromptKeys.map((cmdPrompt) => {
      return smalltalk.prompt("Fill in the following", cmdPrompt)
        .then((value) => {
            return {
              prompt: cmdPrompt,
              value
            };
        })
      .catch(() => {
        // console.log('cancel');
      });
    })).then((responses) => {
      console.warn("responses:",responses);
      responses.forEach((response) => {
        shellCommand = shellCommand.replace(`%${response.prompt}%`,response.value);
      });
      if (cmdPromptKeys.length === responses.filter(x => {
        //TODO: implement some sort of key/value based config file validation & default values;
        return x.value.length > 0;
      }).length) {
        console.warn("Sending Command:",shellCommand);
        this.props.sendCommand(eon,shellCommand);
      }
    });
    // let cmdPrompt = 
    // console.warn("clicked shell command: ", shellCommand);
    // console.warn("cmdPrompt: ", cmdPrompt);
    // if (shellCommand) {
    //   if (Array.isArray(shellCommand)) {
    //     shellCommand = shellCommand.map((cmd) => {
    //       return cmd.replace("%prompt_response%",cmdPrompt).replace('%key%',new Date().getTime());
    //     }).join(" && ");
    //   }
    //   
    // }
  }
  render() {
    const { buttonLabel } = this.props;
    return (
      <div>
      {buttonLabel && <Button className="btn btn-dark" onClick={this.handleButtonClick}>{buttonLabel}</Button>}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskButton);