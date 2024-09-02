import { useState, useEffect } from "react"
import axios from "axios"

export const PrintCountries = ({ filteredCountries, selectedCountry, onShow }) => {
  const [climate, setClimate] = useState('')

  useEffect(() => {
    if (selectedCountry) {
      const apiKey = import.meta.env.VITE_SOME_KEY
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital}&appid=${apiKey}&units=metric`)
        .then(response => setClimate(response.data))
    } else {
      setClimate('')
    }
  }, [selectedCountry])


  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )


  } else if (selectedCountry) {
    return (
      <div className="container">
        <div>
          <h1>{selectedCountry.name.common}</h1>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area}</p>
          <h2>Languages</h2>
          <div>
            <ul>
              {Object.values(selectedCountry.languages).map((language, index) => (
                <li key={index} className="languages">{language}</li>
              ))}
            </ul>
          </div>
          <div>
            <img src={selectedCountry.flags.png} alt="Flag" className="flag" />
          </div>
        </div>
        <div>
          <h1>Weather in {selectedCountry.capital}</h1>
          <p>Tempeture: {climate.main?.temp}°C</p>
          <div >
            <img src={`https://openweathermap.org/img/wn/${climate.weather?.[0]?.icon}@2x.png`} alt="image" />
            <p className="iconClimate">{climate.weather?.[0]?.main}</p>
          </div>
          <p>Wind: {climate.wind?.speed} m/s</p>
        </div>
      </div>
    )


  } else {
    return (
      <div className="container">
        <div>
          <ul>
            {filteredCountries.map((obj, index) => (
              <li key={index} className="list">
                <p>
                  {obj.name.common}
                </p>
                <button onClick={() => onShow(obj)}
                >
                  Show
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )

  }

}
