import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/Home';
import Layout from '../components/Layout';
import { Redirect } from 'react-router';
import routes from '../constants/routes.json';
class HomePage extends Component {
  render() {
    return <Redirect from="/" to={routes.CONNECT_EON} />;
  }
}

export default HomePage;