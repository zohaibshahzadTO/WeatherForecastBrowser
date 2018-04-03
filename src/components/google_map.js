import React, { Component } from 'react';

class GoogleMap extends Component {
  // Lifecycle method that gets called automatically after this component has been rendered to the screen
  componentDidMount() {
      // creates embedded google map inside of app and this.refs.map render it to respective html node
      new google.maps.Map(this.refs.map, {
        zoom: 12,
        center: {
          lat: this.props.lat,
          lng: this.props.lon
        }
      });
  }

  render() {
    // this.refs.map = direct reference to html element
    return <div ref="map" />;
  }
}

export default GoogleMap;
