import React, { Component } from 'react';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import PropTypes from 'prop-types';
import Logo from '../assets/images/comma.svg';
var speedFactor = 30; // number of frames per longitude degree
var animation; // to store and cancel the animation
var startTime = 0;
var progress = 0; // progress = timestamp - startTime
var resetTime = false; // indicator of whether time reset is needed for the animation
var pauseButton = document.getElementById('pause');

const propTypes = {
  tripLine: PropTypes.object,
  hasTripLine: PropTypes.bool,
  refreshingTripLine: PropTypes.bool,
  refreshingMap: PropTypes.bool,
  tripCenterArray: PropTypes.array,
  coordsArrayOfArrays: PropTypes.array
};
class Map extends Component {
  constructor() {
    super();

    this.state = {
      hasTripLine: false
    };
  }
  centerMap = () => {
    const { tripCenterArray, coordsArrayOfArrays, tripLine } = this.props;

    this.map.flyTo({
      center: tripCenterArray
    });
    
    var bounds = coordsArrayOfArrays.reduce(function(bounds, coord) {
        return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordsArrayOfArrays[0], coordsArrayOfArrays[0]));

    this.map.fitBounds(bounds, {
        padding: 20
    });
  }
  refreshTripLine = () => {
    if (this.state.hasTripLine) {
      this.map.removeLayer("route");
      this.map.removeLayer("points");
      this.map.removeSource("route");
      this.map.removeSource("points");
    }
    this.map.addLayer(this.props.tripLine);
    this.map.addLayer(this.props.pointsLine);
    this.setState({
      hasTripLine: true
    });
  }
  componentDidUpdate(origProps) {
    if (this.props.tripLine !== origProps.tripLine) {
      this.refreshTripLine();
    }
    if (this.props.tripCenterArray !== origProps.tripCenterArray) {
      this.centerMap();
    }
  }
  componentDidMount() {
    mapboxgl.accessToken = process.env.MAPBOX_KEY;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/jfrux/cjml07o29c2ec2rryqrw1mq95'
    });

    this.map.on('load',() => {
      if (this.props.geojson) {
       
      }
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return <div className="map" ref={el => this.mapContainer = el} />;
  }
}

Map.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    coordsArrayOfArrays: state.coordsArrayOfArrays,
    tripCenterArray: state.tripCenterArray,
    tripLine: state.tripLine,
    hasTripLine: state.hasTripLine,
    pointsLine: state.pointsLine,
    refreshingTripLine: state.refreshingTripLine,
    refreshingMap: state.refreshingMap
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
