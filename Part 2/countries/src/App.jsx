import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryInfo = ({ country }) => {
  const {
    name,
    capital,
    area,
    languages,
    flags: { svg: flagSvg },
    latlng,
  } = country;

  const languageNames = languages.map((lang) => lang.name).join(', ');

  // Weather state
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(null);

  useEffect(() => {
    // Fetch weather data when the component mounts
    fetchWeatherReport(capital, latlng);
  }, [capital, latlng]);

  const fetchWeatherReport = async (capital, latlng) => {
    try {
      const apiKey = 'c5fd91b1a01cf561c9db62fde987e497';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&lat=${latlng[0]}&lon=${latlng[1]}&units=metric&appid=${apiKey}`
      );

      if (response.status === 200) {
        setWeather(response.data);
      }
    } catch (error) {
      setWeatherError("Error fetching weather information.");
    }
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {area} square kilometers</p>
      <p>Languages: {languageNames}</p>
      <img src={flagSvg} alt={`Flag of ${name.common}`} style={{ maxWidth: '100px' }} />

      {weather && (
        <div>
          <h3>Weather in {capital}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          
          {/* Display weather icon */}
          {weather.weather[0].icon && (
            <img
              src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt="Weather Icon"
              style={{ maxWidth: '1000px' }}
            />
          )}
        </div>
      )}

      {weatherError && <p>{weatherError}</p>}
    </div>
  );
};
function App() {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null);

  const searchCountries = async () => {
    try {
      const response = await axios.get(`https://restcountries.com/v2/name/${query}`);
      
      if (response.status === 200) {
        const data = response.data;

        if (data.length > 10) {
          alert('Too many matches, please be more specific.');
          setCountries([]);
          setSelectedCountry(null);
        } else if (data.length > 1) {
          setCountries(data);
          setSelectedCountry(null);
        } else if (data.length === 1) {
          setCountries([]);
          setSelectedCountry(data[0]);
        } else {
          setCountries([]);
          setSelectedCountry(null);
        }
      }
    } catch (error) {
      setError("Error fetching data from the API.");
    }
  };

  const fetchCountryInfo = async (countryName) => {
    try {
      const response = await axios.get(`https://restcountries.com/v2/name/${countryName}`);
      if (response.status === 200) {
        setSelectedCountry(response.data[0]);
      }
    } catch (error) {
      setError("Error fetching country information.");
    }
  };

  return (
    <div>
      <h1>Country Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a search query for countries"
      />
      <button onClick={searchCountries}>Search</button>

      {error && <p>{error}</p>}

      {countries.length > 0 && (
        <div>
          <h2>Countries found:</h2>
          <ul>
            {countries.map((country) => (
              <li key={country.alpha2Code}>
                {country.name}
                <button onClick={() => fetchCountryInfo(country.name)}>Show Info</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedCountry && <CountryInfo country={selectedCountry} />}
    </div>
  );
}

export default App;
