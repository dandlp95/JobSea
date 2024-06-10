import React, { useState, useEffect, ChangeEventHandler } from 'react'
import filterMenuCSS from './filterMenu.module.css'
import { Modality } from '../customTypes/responseTypes'
import useModalities from '../customHooks/useModalities'
import { FilterOptions } from '../customTypes/requestTypes'

type Props = {
  sendFilterValues: (filterValues: FilterOptions) => void
}

const FilterMenu: React.FunctionComponent<Props> = ({ sendFilterValues }) => {
  const modalities: Modality[] = useModalities()

  const [checkboxes, setCheckboxes] = useState<Record<number, boolean>>({})
  const [filters, setFilters] = useState<FilterOptions>({
    Company: null,
    Locations: null,
    Modalities: [],
    StatusId: null,
    SalaryRange: null
  })

  useEffect(() => {
    const initialCheckboxes: Record<number, boolean> = {}
    modalities.forEach(modality => {
      initialCheckboxes[modality.modalityId] = false
    })
    setCheckboxes(initialCheckboxes)
  }, [])

  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { name, checked } = event.target
    setCheckboxes(prevState => ({
      ...prevState,
      [name]: checked
    }))
  }

  useEffect(() => {
    const modalityIds: number[] = Object.entries(checkboxes)
      .filter(([_, isChecked]) => isChecked)
      .map(([modalityIdString, _]) => parseInt(modalityIdString))
    const newFilters:FilterOptions = {
        ...filters,
        Modalities: modalityIds
    }
  }, [checkboxes])

  const handleMinNumberChange: ChangeEventHandler<HTMLInputElement> = event => {}

  const handleMaxNumberChange: ChangeEventHandler<HTMLInputElement> = event => {}

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
                checked={checkboxes[modality.modalityId] || false}
                onChange={handleCheckboxChange}
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
    </div>
  )
}

export default FilterMenu
