import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import styles from './Styles.css';

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="btn-group-vertical w-100">
          <Link className="btn btn-dark btn-block" to={routes.CONNECT_EON}>Connect EON</Link>
        </div>
      </div>
    );
  }
}