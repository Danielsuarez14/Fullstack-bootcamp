import { useEffect, useState } from 'react'
import axios from 'axios'
import { PrintCountries } from './printCountries'




function App() {

  const [value, setValue] = useState('')
  const [country, setCountry] = useState('')
  const [data, setData] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => setData(response.data))
  }, [])


  useEffect(() => {
    console.log('Effect run, currency is now', country)
    if (country) {
      const filtered = data.filter(n => n.name.common.toLowerCase().includes(country.toLowerCase()))
      setFilteredCountries(filtered)
      if (filteredCountries.length === 1) {
        setSelectedCountry(filteredCountries[0])
      } else {
        setSelectedCountry(null)
      }
    }
  }, [country, data])


  const handleChange = (event) => {
    const newValue = event.target.value
    setValue(newValue)
    setCountry(newValue)
  }

  const handleButton = (obj) => {
    setSelectedCountry(obj)
  }

  const cleanAll = () => {
    setValue('')
    setSelectedCountry(null)
    setFilteredCountries([])

  }

  return (
    <div>
      <label>Find the country </label>
      <input type='text' value={value} onChange={handleChange} />
      <div>
        <button onClick={() => cleanAll()} >Clean</button>
      </div>

      <PrintCountries
        filteredCountries={filteredCountries}
        selectedCountry={selectedCountry}
        onShow={handleButton}
      />
    </div>
  )
}

export default App
