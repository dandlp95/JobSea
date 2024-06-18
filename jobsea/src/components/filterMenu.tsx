import React, { useState, useEffect, ChangeEventHandler } from 'react'
import filterMenuCSS from './filterMenu.module.css'
import { Modality, StatusOption } from '../customTypes/responseTypes'
import useModalities from '../customHooks/useModalities'
import useStatusOptions from '../customHooks/useStatusOptions'
import { FilterOptions } from '../customTypes/requestTypes'
import Button from './button'

enum listFilterKeys {
  Company = 'Company',
  Cities = 'Cities',
  States = 'States'
}

enum listFilterKeysSalary {
  min = 'min',
  max = 'max'
}

type Props = {
  selectedOptions: string[]
  updateSelectedOptions: (updatedOptions: string[], optionsType: listFilterKeys) => void
  listType: listFilterKeys
  sendFilterValues: (filterValues: FilterOptions) => void
}

/*This components will show all the selected options from a field.*/
const FilterOptions: React.FunctionComponent<Props> = ({
  selectedOptions,
  updateSelectedOptions,
  listType
}) => {
  const handleOptionRemoval = (index: number) => {
    selectedOptions.splice(index, 1)

    //Sends the updated list to parent component
    updateSelectedOptions(selectedOptions, listType)
  }

  return (
    <div className={filterMenuCSS.selectedOptions}>
      {selectedOptions.map((option, index) => (
        <div>
          $`{option}`<button onClick={() => handleOptionRemoval(index)}>X</button>
        </div>
      ))}
    </div>
  )
}

const FilterMenu: React.FunctionComponent<Props> = ({ sendFilterValues }) => {
  const modalities: Modality[] = useModalities()
  const status: StatusOption[] = useStatusOptions()

  const [mcheckboxes, setmCheckboxes] = useState<Record<number, boolean>>({})
  const [sCheckboxes, setSCheckboxes] = useState<Record<number, boolean>>({})

  const [filters, setFilters] = useState<FilterOptions>({
    Company: [],
    Cities: [],
    States: [],
    Modalities: [],
    StatusId: null,
    SalaryRange: { min: null, max: null }
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

  /*UseEffect HOOKS FOR WHEN STATUS OR MODALITY CHECKBOXES ARE CHECKED*/
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

    setFilters(newFilters)
  }, [mcheckboxes])

  useEffect(() => {
    //Grabs all the modalities that are CURRENTLY set to true, and are
    //added to the newFilters objects which will be sent to the parent
    //component.
    const statusIds: number[] = Object.entries(sCheckboxes)
      .filter(([_, isChecked]) => isChecked)
      //Has to be converted to int to match the FilterOptions object type
      .map(([statusIdString, _]) => parseInt(statusIdString))
    const newFilters: FilterOptions = {
      ...filters,
      StatusId: statusIds
    }
    setFilters(newFilters)
  }, [sCheckboxes])

  const handleSalaryChange = (
    salaryProperty: listFilterKeysSalary
  ): ChangeEventHandler<HTMLInputElement> => {
    return event => {
      const salaryValue = event.target.value
      setFilters(filters => {
        return {
          ...filters,
          SalaryRange: {
            ...filters.SalaryRange,
            [salaryProperty]: salaryValue === '' ? null : parseInt(salaryValue)
          }
        }
      })
    }
  }

  const handleListInputChange = (
    //name of the filter property, string form
    key: listFilterKeys
  ): ChangeEventHandler<HTMLInputElement> => {
    return event => {
      const newValue = event.target.value
      setFilters(filters => {
        return {
          ...filters,
          [key]: [filters[key], newValue]
        }
      })
    }
  }

  //function to pass to childComponent to update input
  const updateSelectedOptions = (updatedOptions: string[], key: listFilterKeys) => {
    setFilters({ ...filters, [key]: updatedOptions })
  }

  /*BUTTONS FUNCTIONS
  Only set filters to parent component when button is to set or reset filters is pressed.
  */
  const handleSetFilters = () => {
    sendFilterValues(filters)
  }

  const handleResetFilters = () => {
    setFilters({
      Company: [],
      Cities: [],
      States: [],
      Modalities: [],
      StatusId: null,
      SalaryRange: { min: null, max: null }
    })
    sendFilterValues(filters)
  }

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
            <input type='number' onChange={handleSalaryChange(listFilterKeysSalary.min)} />
          </label>
          <label>
            Max. salary
            <input type='number' onChange={handleSalaryChange(listFilterKeysSalary.max)} />
          </label>
        </div>
      </div>
      <div className={filterMenuCSS.locationFilter}>
        <h3>Location</h3>
        <div>
          <div>
            <label>
              City:
              <input type='text' onChange={handleListInputChange(listFilterKeys.Cities)} />
            </label>
          </div>
          <div>
            <label>
              State:
              <input type='text' onChange={handleListInputChange(listFilterKeys.States)} />
            </label>
          </div>
        </div>
      </div>
      <div>
        <label>
          Company:
          <input type='text' onChange={handleListInputChange(listFilterKeys.Company)} />
        </label>
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
      <div className={filterMenuCSS.buttonsDiv}>
        <Button btnText='Set Filters' clickAction={handleSetFilters} />
        <Button btnText='Reset' clickAction={handleResetFilters} />
      </div>
    </div>
  )
}

export default FilterMenu
