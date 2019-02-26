import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EventsTab from './EventsTab';
import DataParamsTab from './DataParamsTab';
import SegmentsTab from './SegmentsTab';
import RoutesTab from './RoutesTab';
import ProfileTab from './ProfileTab';
import EndpointsTab from './EndpointsTab';
import * as EonActions from '../../../actions/eon_detail_actions';
const TABS = {
  'events': {
    'id': 'events',
    'label': 'Events',
    'component': EventsTab,
    'requireAuth': false
  },
  'params': {
    'id': 'params',
    'label': 'Params',
    'component': DataParamsTab,
    'requireAuth': true
  },
  'profile': {
    'id': 'profile',
    'label': 'Profile',
    'component': ProfileTab,
    'requireAuth': true
  },
  // 'routes': {
  //   'label': 'Routes',
  //   'component': RoutesTab
  // },
  'segments': {
    'id': 'segments',
    'label': 'Drives',
    'component': SegmentsTab,
    'requireAuth': true
  }
  // 'endpoints': {
  //   'label': 'Endpoints',
  //   'component': EndpointsTab
  // }
};
const TAB_KEYS = Object.keys(TABS);
const propTypes = {};
class Console extends React.Component {
  constructor(props) {
    super(props);

    this.setTab = this.setTab.bind(this);
    this.state = {
      activeTab: 'events'
    };
  }

  setTab(tab) {
    let disabled = (tab.requireAuth && !this.props.hasAuth);
    if (this.state.activeTab !== tab.id && !disabled) {
      this.setState({
        activeTab: tab.id
      });
    }
  }

  render() {
    const { hasAuth } = this.props;
    const tabButtons = TAB_KEYS.map((tabKey) => {
      const tab = TABS[tabKey];
      const disabled = tab.requireAuth && !hasAuth;
      return (
        <NavItem className="console-tab" key={`tab-item-${tabKey}`}>
          <NavLink className={classnames({ active: this.state.activeTab === tabKey })} onClick={() => { this.setTab(tab); }} disabled={disabled} >
            {tab.label}
          </NavLink>
        </NavItem>
      );
    });

    const tabPanes = TAB_KEYS.map((tabKey) => {
      const tab = TABS[tabKey];
      const PaneComponent = tab.component;
      return (
        <TabPane className="console-pane" key={`tab-pane-${tabKey}`} tabId={tabKey}>
          {this.state.activeTab === tabKey && <PaneComponent />}
        </TabPane>
      );
    });

    return (
      <div className="console">
        <Nav className="console-tabs" tabs>
          {tabButtons}
        </Nav>
        <TabContent className="console-content" activeTab={this.state.activeTab}>
          {tabPanes}
        </TabContent>
      </div>
    );
  }
}
Console.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonActions, dispatch);
}

const mapStateToProps = ({eonDetail}) => {
  const { auth } = eonDetail;
  let hasAuth;
  if (auth) {
    if (auth.commaUser) {
      hasAuth = true;
    }
  } else {
    hasAuth = false;
  }
  console.log("hasAuth:",hasAuth);
  return {
    hasAuth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Console);
