import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as EonActions from '../../actions/eon_detail_actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  commands: PropTypes.array,
  fields: PropTypes.array,
  requireSu: PropTypes.bool,
  runCommand: PropTypes.func
};

class TerminalCommand extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false, status: 'Closed' };
  }

  onEntering() {
    this.setState({ status: 'Opening...' });
  }

  onEntered() {
    this.setState({ status: 'Opened' });
  }

  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Closed' });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  buildCommand = () => {
    let fullCommand = this.props.commands.map((command) => {
      if (this.props.fields) {
        this.props.fields.forEach((field) => {
          const fieldName = field[0];
          const fieldLabel = field[1];
          const fieldType = field[2];
          const fieldPlaceholder = field[3];
          let matchToReplace = `%${fieldName}%`;
          let valueToSet = fieldPlaceholder;

          if (this[fieldName]) {
            valueToSet = this[fieldName];
          }
          if (valueToSet) {
            command = command.replace(matchToReplace,valueToSet);
          }
        });
      }
      return command;
    }).join("; ")
    if (this.props.requireSu) {
      fullCommand = `su -c '${fullCommand}'`;
    }
    fullCommand = `${fullCommand}\r`;
    return fullCommand;
  }

  runCommand = () => {
    let command = this.buildCommand();
    if (command) {
      if (this.props.onRunCommand) {
        this.props.onRunCommand(command);
      }
      this.props.RUN_COMMAND(command);
    }
  }

  hideCommand = () => {
    this.props.HIDE_COMMAND();
  }

  setFieldValue = (field, value) => {
    console.warn(`${field}: ${value}`); 
    this[field] = value;
    this.buildCommand();
  }

  render() {
    const { name, description, commands, fields, children, className } = this.props;
    let fieldTags;
    if (fields && fields.length) {
      fieldTags = fields.map((field, index) => {
        const fieldName = field[0];
        const fieldLabel = field[1];
        const fieldType = field[2];
        const fieldPlaceholder = field[3];
        return (
          <FormGroup key={index}>
            <Label for={fieldName}>{fieldLabel}</Label>
            <Input type={fieldType} name={fieldName} id={fieldName} onChange={(evt) => { this.setFieldValue(fieldName,evt.target.value);}} defaultValue={fieldPlaceholder} />
          </FormGroup>
        );
      });
    }
    
    return (<div>
      <h3>{name}</h3>
      <p>{description}</p>
      <Form>
        {this.fullCommand}
        {fieldTags}
        {children}
        <ButtonGroup>
          <Button onClick={this.runCommand}><FontAwesomeIcon icon="play" />&nbsp;&nbsp;Run</Button>
          <Button onClick={this.hideCommand}>Cancel</Button>
        </ButtonGroup>
      </Form>
    </div>);
  }
}

TerminalCommand.propTypes = propTypes;

function mapDispatchToProps(dispatch,ownProps) {
  return bindActionCreators(EonActions, dispatch);
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TerminalCommand);