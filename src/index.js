import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import WeatherDisplay from './WeatherDisplay';

const OPEN_WEATHER_API_KEY = '362a4b039038e395008ed626997d3623';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tempKelv: null,
      tempFar: null,
      errorMessage: ''
    };

    this.getTemperature = this.getTemperature.bind(this);
  }

  componentDidMount() {
    this.getTemperature();
  }

  componentDidUpdate () {
    const { tempKelv } = this.state;
    if (tempKelv) {
      const tempFar = this.convertKelvinToFahrenfeit(tempKelv);
      if (tempFar !== this.state.tempFar) {
        this.setState({ tempFar });
      }
    }

  }

  getTemperature() {
    const zipCode = '55123';
    const countryCode = 'us';

    axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${OPEN_WEATHER_API_KEY}`)
      .then(response => {
        console.log(response);
        this.setState({ tempKelv: response.data.main.temp })
      }).catch (error => {
        this.setState({errorMessage: error.message});
      })
  }

  convertKelvinToFahrenfeit (temp) {
    return ((9/5) * (temp - 273) + 32).toFixed(2);
  }

  render () {
    if (this.state.tempFar) {
      return <WeatherDisplay temp={this.state.tempFar} />;
    }

    if (this.state.errorMessage) {
      return <h2>Error: { this.state.errorMessage }</h2>
    }

    return <div>Loading...</div>;
  }

}

ReactDOM.render(<App />, document.querySelector('#root'));