import React, { useState, useEffect, ChangeEventHandler, SetStateAction } from 'react'
import filterMenuCSS from './filterMenu.module.css'
import { Modality, StatusOption } from '../customTypes/responseTypes'
import useModalities from '../customHooks/useModalities'
import useStatusOptions from '../customHooks/useStatusOptions'
import { FilterOptions } from '../customTypes/requestTypes'
import Button from './button'
import SelectFilterOptions from './selectFilterOptions'
import { listFilterKeys, listFilterKeysSalary, checkboxesFilters } from '../customTypes/enumTypes'

type Props = {
  sendFilterValues: (filterValues: FilterOptions) => void
}

/* Main Filter Menu component */
const FilterMenu: React.FunctionComponent<Props> = ({ sendFilterValues }) => {
  const modalities: Modality[] = useModalities()
  const status: StatusOption[] = useStatusOptions()

  const [mcheckboxes, setmCheckboxes] = useState<Record<number, boolean>>({})
  const [sCheckboxes, setSCheckboxes] = useState<Record<number, boolean>>({})

  const [city, setCity] = useState<string>()
  const [state, setState] = useState<string>()
  const [company, setCompany] = useState<string>()

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
    const setUpCheckboxes = (
      items: Modality[] | StatusOption[],
      setCheckboxes: React.Dispatch<SetStateAction<Record<number, boolean>>>
    ) => {
      let initialCheckboxes: Record<number, boolean> = {}
      items.forEach(item => {
        'modalityId' in item
          ? (initialCheckboxes[item.modalityId] = false)
          : (initialCheckboxes[item.statusId] = false)
      })
      setCheckboxes(initialCheckboxes)
    }

    setUpCheckboxes(modalities, setmCheckboxes)
    setUpCheckboxes(status, setSCheckboxes)
  }, [])

  //Function called when a checkbox is checked, which sets the checkbox object
  //with the name that matches the modalityId that was checked set to true
  const handleCheckboxChange = (
    checkboxType: checkboxesFilters
  ): ChangeEventHandler<HTMLInputElement> => {
    const checkBoxUpdater = {
      [checkboxesFilters.modality]: setmCheckboxes,
      [checkboxesFilters.status]: setSCheckboxes
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

  const handleListInputChange = (key: listFilterKeys) => {
    setFilters(filters => {
      const listOptionsHandler = {
        [listFilterKeys.Cities]: city,
        [listFilterKeys.Company]: company,
        [listFilterKeys.States]: state
      }

      return {
        ...filters,
        [key]: [...filters[key], listOptionsHandler[key]]
      }
    })
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
    <div className={filterMenuCSS.filterMenuMain}>
      <div className={filterMenuCSS.buttonsDiv}>
        {/* <Button btnText='Set Filters' clickAction={handleSetFilters} />
        <Button btnText='Reset' clickAction={handleResetFilters} /> */}
        <div onClick={handleSetFilters}>Apply Filters</div>{' '}
        <div onClick={handleResetFilters}>Reset Filters</div>
      </div>
      <div className={filterMenuCSS.modality}>
        <h3>Modality</h3>
        <div className={filterMenuCSS.modalityChecklistContainer}>
          {modalities &&
            modalities.map(modality => (
              <div className={filterMenuCSS.checkboxContainer}>
                <label
                  key={modality.modalityId.toString()}
                  htmlFor={modality.modalityId.toString()}
                >
                  {modality.name}
                </label>
                <input
                  type='checkbox'
                  name={modality.modalityId.toString()}
                  checked={mcheckboxes[modality.modalityId] || false}
                  onChange={handleCheckboxChange(checkboxesFilters.modality)}
                />
              </div>
            ))}
        </div>
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
          <div className={filterMenuCSS.cityFilter}>
            <label>
              City:
              <input type='text' onChange={event => setCity(event?.target?.value)} />
            </label>
            <button onClick={() => handleListInputChange(listFilterKeys.Cities)}>Add City</button>
            <div>
              <SelectFilterOptions
                selectedOptions={filters.Cities}
                updateSelectedOptions={updateSelectedOptions}
                listType={listFilterKeys.Cities}
              />
            </div>
          </div>
          <div className={filterMenuCSS.stateFilter}>
            <label>
              State:
              <input type='text' onChange={event => setState(event?.target?.value)} />
              <button onClick={() => handleListInputChange(listFilterKeys.States)}>
                Add State
              </button>
            </label>
            <div>
              <SelectFilterOptions
                selectedOptions={filters.States}
                updateSelectedOptions={updateSelectedOptions}
                listType={listFilterKeys.States}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={filterMenuCSS.company}>
        <label>
          Company:
          <input type='text' onChange={event => setCompany(event?.target?.value)} />
          <button onClick={() => handleListInputChange(listFilterKeys.Company)}>Add Filter</button>
        </label>
        <div>
          <SelectFilterOptions
            selectedOptions={filters.Company}
            updateSelectedOptions={updateSelectedOptions}
            listType={listFilterKeys.Company}
          />
        </div>
      </div>
      <div className={filterMenuCSS.statusFilter}>
        <h3>Status</h3>
        <div className={filterMenuCSS.statusChecklistContainer}>
          {status.map(status => (
            <div className={filterMenuCSS.checkboxContainer}>
              <label>{status.statusName}</label>
              <input
                type='checkbox'
                name={status.statusId.toString()}
                checked={sCheckboxes[status.statusId] || false}
                onChange={handleCheckboxChange(checkboxesFilters.status)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterMenu
