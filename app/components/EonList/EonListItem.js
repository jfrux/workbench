import React, { Component } from 'react';
import Eon from "../../images/device-icons/eon.svg";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ListGroupItem } from 'reactstrap';
import classNames from 'classnames';
import LoadingIndicator from '../LoadingIndicator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as EonListActions from '../../actions/eon_list_actions';

const propTypes = {
  index: PropTypes.number,
  eon: PropTypes.any,
  action: PropTypes.func
};

class EonListItem extends Component {
  componentDidMount() {
    if (this.props.eon.addStatus === 1) {
      this.props.DO_PING_EON(this.props.eon);
    }
  }
  render() {
    const { eon, action, index} = this.props;
    const { ip, mac, status, addStatus, reachable } = eon;
    const disabled = (addStatus === 0) || (reachable === 2) || (reachable === 0);
    var eonClasses = classNames({
      'eon-list-item': true,
      results_button: true,
      disabled
    });
    return (<ListGroupItem key={index} onClick={action} disabled={disabled} className={eonClasses} tag="button">
        <span className={"eon_icon"}>
          {(addStatus === 1 && reachable === 1) && 
            [<FontAwesomeIcon icon={'check'} key={'icon-'+index}/>,
            <Eon width="100%" height="100%" key={'eonIcon-'+index} />]
          }
          {(addStatus === 1 && reachable === 2) && 
            [<FontAwesomeIcon icon={'times'} key={'icon-'+index}/>,
            <Eon width="100%" height="100%" key={'eonIcon-'+index} />]
          }
          {(reachable === 0) &&  
            <LoadingIndicator className={"loading-indicator"} />
          }
          {(addStatus === 2) && 
            [<FontAwesomeIcon icon={'question'} key={'icon-'+index}/>,
            <Eon width="100%" height="100%" key={'eonIcon-'+index} />]
          }
          {(addStatus === 3) && 
            [<FontAwesomeIcon icon={'check'} key={'icon-'+index}/>,
            <Eon width="100%" height="100%" key={'eonIcon-'+index} />]
          }
        </span>
        <span className={"results_details"}>
          <span className={"results_button_ip"}>
            {(addStatus === 0) && "Identifying Device..."}
            {(addStatus === 1) && mac}
            {(addStatus === 2) && "Unidentified Device"}
            {(addStatus === 3) && (mac ? mac : "Unidentified Device")}
          </span>
          <span className={"results_button_mac"}>{ip}</span>
        </span>
        <span className={"results_button_selected"}><FontAwesomeIcon icon={'chevron-right'}/></span>
    </ListGroupItem>);
  }
}

EonListItem.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonListActions, dispatch);
}

const mapStateToProps = (state, {id,type}) => {
  let eon = {};
  if (type === 'resolved') {
    // console.warn("mapping resolved...");
    eon = state.eonList.eons[id];
  } else {
    // console.warn("mapping unresolved...");
    eon = state.eonList.unresolvedEons[id];
  }
  return {
    eon
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EonListItem);
