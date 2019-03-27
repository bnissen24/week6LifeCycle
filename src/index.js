import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import WeatherDisplay from './WeatherDisplay';
import SearchBar from './SearchBar';

const OPEN_WEATHER_API_KEY = '362a4b039038e395008ed626997d3623';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      temp: null,
      errorMessage: '',
      zipCode: '55123'
    };

    this.getTemperature = this.getTemperature.bind(this);
  }

  componentDidMount() {
    this.getTemperature();
  }

  getTemperature() {
    const zipCode = this.state.zipCode;
    const countryCode = 'us';

    axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${OPEN_WEATHER_API_KEY}`)
      .then(response => {
        this.setState({ temp: this.convertKelvinToFahrenfeit(response.data.main.temp) })
      }).catch (error => {
        this.setState({errorMessage: error.message});
      })
  }

  convertKelvinToFahrenfeit (temp) {
    return ((9/5) * (temp - 273) + 32).toFixed(2);
  }

  onFormSubmit = (zipCode) => {
    this.setState({ zipCode: zipCode });
    this.getTemperature();
  }

  render () {
    if (this.state.temp) {
      return (
        <div>
          <SearchBar onSubmit={this.onFormSubmit} zipCode={this.state.zipCode} />
          <WeatherDisplay temp={this.state.temp} />
        </div>
      );
    }

    if (this.state.errorMessage) {
      return <h2>Error: { this.state.errorMessage }</h2>
    }

    return <div>Loading...</div>;
  }

}

ReactDOM.render(<App />, document.querySelector('#root'));