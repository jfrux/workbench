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
  disabled: PropTypes.bool,
  ip: PropTypes.string,
  mac: PropTypes.string,
  status: PropTypes.string,
  addStatus: PropTypes.number,
  reachable: PropTypes.number
};

class EonListItem extends Component {
  componentDidMount() {
    if (this.props.addStatus === 1) {
      this.props.DO_PING_EON(this.props);
    }
  }
  deleteEon = () => {
    console.log("DELETE ACTION");
    if (this.props.addStatus === 2) {
      this.props.REMOVE_EON(this.props.id);
    }
  }
  selectEon = (id) => {
    if (this.props.addStatus !== 2) {
      this.props.SELECT_EON(id);
    }
  }
  render() {
    const { id, index, disabled, ip, mac, status, addStatus, reachable } = this.props;
    var eonClasses = classNames({
      'eon-list-item': true,
      results_button: true,
      'inactive': disabled
    });
    let tagName = "button";

    if (disabled) {
      tagName = "div";
    }
    return (<ListGroupItem key={index} className={eonClasses}>
      <button onClick={() => { this.selectEon(id) }}>
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
        {(addStatus !== 2) &&
          <span className={"results_button_selected"}><FontAwesomeIcon icon={'chevron-right'}/></span>
        }
      </button>
      {(addStatus === 2) &&
        <button className={"results_button_delete"}>
          <span onClick={this.deleteEon}><FontAwesomeIcon icon={'trash-alt'}/></span>
        </button>
      }
    </ListGroupItem>
    );
  }
}

EonListItem.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonListActions, dispatch);
}

const mapStateToProps = ({ eonList }, {id,type}) => {
  let eon = {};
  let disabled = false;

  if (type === 'resolved') {
    // console.warn("mapping resolved...");
    eon = eonList.eons[id];
  } else {
    // console.warn("mapping unresolved...");
    eon = eonList.unresolvedEons[id];
  }
  if ((eon.addStatus === 0) || (eon.reachable === 2) || (eon.reachable === 0)) {
    disabled = true;
  }
  return {
    ...eon,
    disabled
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EonListItem);
