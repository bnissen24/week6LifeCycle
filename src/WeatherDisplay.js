import React from 'react';

import './WeatherDisplay.css';

const determineWeather = (temp) => {
  if (temp < 0) {
    return 'Please Stay Inside';
  } else if (temp > 0 && temp < 32) {
    return 'It is freezing';
  } else if (temp > 32 && temp < 55) {
    return 'It is chilly';
  } else if (temp > 55 & temp < 75) {
    return 'It is pretty nice out';
  } else {
    return 'It is soooo hot';
  }
};

const WeatherDisplay = props => {
  const weatherDescip = determineWeather(props.temp);

  return (
    <div className="weather-display">
      <h1 className="weather-display__temp">It is currently { props.temp } degrees Fahrenheit</h1>
      <h2 className="weather-display__descrip">{ weatherDescip } </h2>
    </div>
  );
}

export default WeatherDisplay;