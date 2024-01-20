import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryInfo = ({ country }) => {
  const {
    name,
    capital,
    area,
    languages,
    flags: { svg: flagSvg },
  } = country;

  const languageNames = languages.map((lang) => lang.name).join(', ');

  return (
    <div>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {area} square kilometers</p>
      <p>Languages: {languageNames}</p>
      <img src={flagSvg} alt={`Flag of ${name.common}`} style={{ maxWidth: '100px' }} />
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
              <li key={country.alpha2Code}>{country.name}</li>
            ))}
          </ul>
        </div>
      )}

      {selectedCountry && <CountryInfo country={selectedCountry} />}
    </div>
  );
}

export default App;
