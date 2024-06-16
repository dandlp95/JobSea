import React, { useState, useEffect, ChangeEventHandler } from 'react'
import filterMenuCSS from './filterMenu.module.css'
import { Modality, StatusOption } from '../customTypes/responseTypes'
import useModalities from '../customHooks/useModalities'
import useStatusOptions from '../customHooks/useStatusOptions'
import { FilterOptions } from '../customTypes/requestTypes'

type Props = {
  sendFilterValues: (filterValues: FilterOptions) => void
}

const FilterMenu: React.FunctionComponent<Props> = ({ sendFilterValues }) => {
  const modalities: Modality[] = useModalities()
  const status: StatusOption[] = useStatusOptions()

  const [mcheckboxes, setmCheckboxes] = useState<Record<number, boolean>>({})
  const [sCheckboxes, setSCheckboxes] = useState<Record<number, boolean>>({})

  const [filters, setFilters] = useState<FilterOptions>({
    Company: null,
    Cities: null,
    States: null,
    Modalities: [],
    StatusId: null,
    SalaryRange: null
  })

  //It gets all the Modalities Ids from the backend, then creates a
  //list of objects where modalityId is the name, and the value is all set to false
  // e.g. [{1:false}, {2:false}]
  useEffect(() => {
    //Setup modalities checkboxes
    let initialCheckboxes: Record<number, boolean> = {}
    modalities.forEach(modality => {
      initialCheckboxes[modality.modalityId] = false
    })
    setmCheckboxes(initialCheckboxes)

    //Setup satatus checkboxes
    initialCheckboxes = {}
    status.forEach(status => {
      initialCheckboxes[status.statusId] = false
    })
    setSCheckboxes(initialCheckboxes)
  }, [])

  //Function called when a checkbox is checked, which sets the checkbox object
  //with the name that matches the modalityId that was checked set to true
  const handleCheckboxChange = (
    checkboxType: 'modality' | 'status'
  ): ChangeEventHandler<HTMLInputElement> => {
    const checkBoxUpdater = {
      modality: setmCheckboxes,
      status: setSCheckboxes
    }

    return event => {
      const { name, checked } = event.target
      const setState = checkBoxUpdater[checkboxType]

      // Handle checkbox change logic
      setState(prevState => ({
        ...prevState,
        [name]: checked
      }))
    }
  }

  //Called when a change in the checkbox is checked
  useEffect(() => {
    //Grabs all the modalities that are CURRENTLY set to true, and are
    //added to the newFilters objects which will be sent to the parent
    //component.
    const modalityIds: number[] = Object.entries(mcheckboxes)
      .filter(([_, isChecked]) => isChecked)
      //Has to be converted to int to match the FilterOptions object type
      .map(([modalityIdString, _]) => parseInt(modalityIdString))
    const newFilters: FilterOptions = {
      ...filters,
      Modalities: modalityIds
    }
  }, [mcheckboxes])

  const handleMinNumberChange: ChangeEventHandler<HTMLInputElement> = event => {}

  const handleMaxNumberChange: ChangeEventHandler<HTMLInputElement> = event => {}

  const handleCityInput: ChangeEventHandler<HTMLInputElement> = event => {}

  const handleStateInput: ChangeEventHandler<HTMLInputElement> = event => {}

  const sendData = () => {
    sendFilterValues(filters)
  }

  const clickAction = () => {}

  return (
    <div>
      <div className={filterMenuCSS.modality}>
        <h3>Modality</h3>
        {modalities &&
          modalities.map(modality => (
            <label key={modality.modalityId.toString()}>
              {modality.name}
              <input
                type='checkbox'
                name={modality.modalityId.toString()}
                checked={mcheckboxes[modality.modalityId] || false}
                onChange={handleCheckboxChange('modality')}
              />
            </label>
          ))}
      </div>
      <div className={filterMenuCSS.salary}>
        <h3>Salary Range</h3>
        <div>
          <label>
            Min. salary
            <input type='number' onChange={handleMinNumberChange} />
          </label>
          <label>
            Max. salary
            <input type='number' onChange={handleMaxNumberChange} />
          </label>
        </div>
      </div>
      <div className={filterMenuCSS.locationFilter}>
        <h3>Location</h3>
        <div>
          <label>
            City:
            <input type='text' onChange={handleCityInput} />
          </label>
          <label>
            State:
            <input type='text' onChange={handleStateInput} />
          </label>
        </div>
      </div>
      <div className={filterMenuCSS.statusFilter}>
        <h3>Status</h3>
        <div>
          {status.map(status => (
            <label>
              {status.statusName}
              <input
                type='checkbox'
                name={status.statusId.toString()}
                checked={sCheckboxes[status.statusId] || false}
                onChange={handleCheckboxChange('status')}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterMenu
