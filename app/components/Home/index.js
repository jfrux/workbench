import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import styles from './Styles.css';

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="list-group w-100">
          <div className="list-item"><Link className="btn btn-dark btn-block" to={routes.CONNECT_EON}>Connect / Change EON</Link></div>
          <div className="list-item"><Link className="btn btn-dark btn-block" to={routes.OPENPILOT}>Openpilot</Link></div>
          <div className="list-item"><Link className="btn btn-dark btn-block" to={routes.FINGERPRINT}>Fingerprint</Link></div>
        </div>
      </div>
    );
  }
}