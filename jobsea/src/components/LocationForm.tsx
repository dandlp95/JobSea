import React, {
  useState,
  useEffect,
  ChangeEventHandler,
  KeyboardEvent,
  SetStateAction,
  Dispatch
} from 'react'
import LocationFormCSS from './LocationForm.module.css'
import { State, City, ApiData } from '../customTypes/responseTypes'
import {
  citiesApiServiceInstance,
  statesApiServiceInstance
} from '../utilities/ApiServices/geoLocationApiService'

type Props = {}

const LocationForm: React.FunctionComponent<Props> = ({}) => {
  const arraySlice: number = 6
  const [states, setStates] = useState<State[]>([])
  const [filteredStates, setFilteredStates] = useState<State[]>([])
  const [stateInput, setStateInput] = useState<string>('')
  const [isStatesOpen, setIsStatesOpen] = useState<boolean>(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1)

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
    setSelectedOptionIndex(-1)
  }

  const stateSelectHandler = (state: string) => {
    setStateInput(state)
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
    setSelectedOptionIndex(-1)
  }

  const citySelectHandler = (city: string) => {
    setCityInput(city)
    handleBlur('cities')
  }

  const filterCities = (userInput: string) => {
    return cities.filter(city => city.name.toLowerCase().includes(userInput.toLowerCase()))
  }

  // This handles when element loses focus...
  const handleBlur = (elementType: string) => {
    if (elementType === 'states') {
      handleBlueHelper(setIsStatesOpen)
    } else if (elementType === 'cities') {
      handleBlueHelper(setIsCitiesOpen)
    }
  }

  const handleBlueHelper = (stateAction: Dispatch<SetStateAction<boolean>>) => {
    if (typeof stateAction === 'function') {
      setTimeout(() => {
        stateAction(false)
        setSelectedOptionIndex(-1)
      }, 150)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, array: string) => {
    var locationArray: (State | City)[] = []

    if (array === 'states') locationArray = filteredStates
    else if (array === 'cities') locationArray = filteredCities
    else throw new Error('Invalid array parameter.')

    if (locationArray.length === 0) return

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        setSelectedOptionIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
        break
      case 'ArrowDown':
        e.preventDefault()
        setSelectedOptionIndex(prevIndex =>
          prevIndex < arraySlice - 1 ? prevIndex + 1 : prevIndex
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedOptionIndex >= 0 && selectedOptionIndex < arraySlice) {
          array === 'states'
            ? stateSelectHandler(locationArray[selectedOptionIndex].name)
            : citySelectHandler(locationArray[selectedOptionIndex].name)
        }
        setSelectedOptionIndex(-1)
        break
    }
  }

  return (
    <div className={LocationFormCSS.locationForm}>
      <div>
        <label htmlFor='state'>Select state location:</label>
        <input
          type='text'
          value={stateInput}
          onChange={stateInputChange}
          onBlur={() => handleBlur('states')}
          onKeyDown={e => handleKeyDown(e, 'states')}
        />
        {isStatesOpen && (
          <div className={LocationFormCSS.locationDropdown}>
            {filteredStates.slice(0, arraySlice).map((state, idx) => (
              <div
                key={state.name}
                className={`${LocationFormCSS.dropdownOption} ${
                  idx === selectedOptionIndex ? LocationFormCSS.selectedOption : ''
                }`}
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
          onKeyDown={e => handleKeyDown(e, 'cities')}
        />
        {isCitiesOpen && (
          <div className={LocationFormCSS.locationDropdown}>
            {filteredCities.slice(0, arraySlice).map((city, idx) => (
              <div
                key={city.name}
                className={`${LocationFormCSS.dropdownOption} ${
                  idx === selectedOptionIndex ? LocationFormCSS.selectedOption : ''
                }`}
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
