import React, { Component } from 'react';
import Eon from "../../images/device-icons/eon.svg";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ListGroupItem } from 'reactstrap';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as EonListActions from '../../actions/eon_list_actions';
const propTypes = {
  index: PropTypes.number,
  eon: PropTypes.any,
  action: PropTypes.func
};

class EonListItem extends Component {
  render() {
    const { eon, action, index} = this.props;
    const { ip, mac, status, addStatus } = eon;
    var eonClasses = classNames({
      'eon-list-item': true,
      results_button: true,
      disabled: addStatus === 0
    });
    return (<ListGroupItem key={index} onClick={action} className={eonClasses} tag="button">
        <span className={"eon_icon"}>
          {(eon.addStatus === 1) && 
            <FontAwesomeIcon icon={['fas', 'check']}/>
          }
          {(eon.addStatus === 0) &&  
            <FontAwesomeIcon icon="spinner-third" className={classNames({
              "fa-spin": true
            })} />
          }
          {(eon.addStatus === 2) && 
            <FontAwesomeIcon icon={['fas', 'times-octagon']}/>
          }
          <Eon width="100%" height="100%" />
        </span>
        <span className={"results_details"}>
          <span className={"results_button_ip"}>
            {(eon.addStatus === 0) && "Identifying Device..."}
            {(eon.addStatus === 1) && eon.mac}
            {(eon.addStatus === 2) && "Unidentified Device"}
          </span>
          <span className={"results_button_mac"}>{eon.ip}</span>
        </span>
        <span className={"results_button_selected"}><FontAwesomeIcon icon={['fas', 'chevron-right']}/></span>
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
