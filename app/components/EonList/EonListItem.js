import React, { Component } from 'react';
import Eon from "../../images/device-icons/eon.svg";
import PropTypes from 'prop-types';
import routes from '../../constants/routes.json';
import LoadingIndicator from '../LoadingIndicator';
import { ListGroupItem } from 'reactstrap';
import classNames from 'classnames';
import statusMessages from '../../constants/scan_status_messages.json';
import sshConnectionStatusMessages from '../../constants/ssh_connection_status.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const propTypes = {
  index: PropTypes.number,
  eon: PropTypes.object,
  listType: PropTypes.string,
  action: PropTypes.func
};

class EonListItem extends Component {
  render() {
    const { eon, action, index} = this.props;
    const { ip, mac, status } = eon;
    var eonClasses = classNames({
      'eon-list-item': true
    });
    return (<ListGroupItem key={index} onClick={action} className={eonClasses} tag="button">
              <span className={styles.eon_icon}><Eon width="100%" height="100%" /></span>
              <span className={styles.results_details}>
                <span className={styles.results_button_ip}>{ip}</span>
                <span className={styles.results_button_mac}>{mac}</span>
              </span>
              <span className={styles.results_button_selected}><FontAwesomeIcon icon={['fas', 'chevron-right']}/></span>
            </ListGroupItem>
    );
  }
}

EonListItem.propTypes = propTypes;

export default EonListItem;