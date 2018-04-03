import React, { Component } form 'react';
import { connect } from 'react-redux';

class WeatherList extends Component {
  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>Pressure</th>
            <th>humidity</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather }; // { weather: weather }
}

export default connect(mapStateToProps)(WeatherList);
