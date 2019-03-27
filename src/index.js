import React from 'react';
import ReactDOM from 'react-dom';

import WeatherDisplay from './WeatherDisplay';
import SearchBar from './SearchBar';
import OpenWeatherMap from './openweathermap';

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

  getTemperature = async () =>{
    const zipCode = this.state.zipCode;

    const temp = await OpenWeatherMap.getWeatherByZip(zipCode)

    this.setState({ temp })
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