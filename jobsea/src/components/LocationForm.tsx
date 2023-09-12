import React, { useState, useEffect, ChangeEventHandler } from 'react'
import LocationFormCSS from './LocationForm.module.css'
import { State, City, ApiData } from '../customTypes/responseTypes'
import {
  citiesApiServiceInstance,
  statesApiServiceInstance
} from '../utilities/ApiServices/geoLocationApiService'

type Props = {}

const LocationForm: React.FunctionComponent<Props> = ({}) => {
  const [states, setStates] = useState<State[]>([])
  const [filteredStates, setFilteredStates] = useState<State[]>([])
  const [stateInput, setStateInput] = useState<string>('')
  const [isStatesOpen, setIsStatesOpen] = useState<boolean>(false)

  const [cities, setCities] = useState<City[]>([])
  const [filteredCities, setFilteredCities] = useState<City[]>([])
  const [isCitiesOpen, setIsCitiesOpen] = useState<boolean>(false)
  const [cityInput, setCityInput] = useState<string>('')

  useEffect(() => {
    const getStates = async () => {
      const response = await statesApiServiceInstance.getStates()
      if (response.result) {
        setStates(response.result)
      }
    }
    getStates()
  }, [])

  useEffect(() => {
    const getCities = async () => {
      const state = states.find(state => state.name.toLowerCase() === stateInput.toLowerCase())
      if (state) {
        const response = await citiesApiServiceInstance.getCities(state.id)
        if (response.result) {
          setCities(response.result)
        }
      }
    }
    getCities()
  }, [stateInput])

  const stateInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    const userInput = event.target.value
    setStateInput(userInput)
    const result = filterStates(userInput)
    setFilteredStates(result)
    setIsStatesOpen(true)
  }

  const stateSelectHandler = (state: string) => {
    setStateInput(state)
    // setIsStatesOpen(false)
    handleBlur('states')
  }

  const filterStates = (userInput: string) => {
    return states.filter(state => state.name.toLowerCase().includes(userInput.toLowerCase()))
  }

  const cityInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    const userInput = event.target.value
    setCityInput(userInput)
    const result = filterCities(userInput)
    setFilteredCities(result)
    setIsCitiesOpen(true)
  }

  const citySelectHandler = (city: string) => {
    setCityInput(city)
    // setIsCitiesOpen(false)
    handleBlur('cities')
  }

  const filterCities = (userInput: string) => {
    return cities.filter(city => city.name.toLowerCase().includes(userInput.toLowerCase()))
  }

  // This handles when element loses focus...
  const handleBlur = (elementType: string) => {
    if (elementType === 'states') {
      setTimeout(() => {
        setIsStatesOpen(false)
      }, 250)
    } else if (elementType === 'cities') {
      setTimeout(() => {
        setIsCitiesOpen(false)
      }, 250)
    }
  }

  return (
    <div className={LocationFormCSS.main}>
      <div>
        <label htmlFor='state'>Select state location:</label>
        <input
          type='text'
          value={stateInput}
          onChange={stateInputChange}
          onBlur={() => handleBlur('states')}
        />
        {isStatesOpen && (
          <div className={LocationFormCSS.stateDropdown}>
            {filteredStates.slice(0, 5).map(state => (
              <div
                key={state.name}
                className={LocationFormCSS.stateOption}
                onClick={() => stateSelectHandler(state.name)}
                style={{ cursor: 'pointer' }}
              >
                {state.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <label htmlFor='city'>Select city location:</label>
        <input
          type='text'
          value={cityInput}
          onChange={cityInputChange}
          onBlur={() => handleBlur('cities')}
        />
        {isCitiesOpen && (
          <div className={LocationFormCSS.stateDropdown}>
            {filteredCities.slice(0, 5).map(city => (
              <div
                key={city.name}
                className={LocationFormCSS.stateOption}
                onClick={() => citySelectHandler(city.name)}
                style={{ cursor: 'pointer' }}
              >
                {city.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default LocationForm
