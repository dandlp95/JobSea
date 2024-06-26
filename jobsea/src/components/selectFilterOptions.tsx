import React from 'react'
import { FilterOptions } from '../customTypes/requestTypes'
import { listFilterKeys } from '../customTypes/enumTypes'
import selectFilterOptionsCSS from './selectFilterOptions.module.css'

type Props = {
  selectedOptions: string[]
  updateSelectedOptions: (updatedOptions: string[], optionsType: listFilterKeys) => void
  listType: listFilterKeys
}
/*This components will show all the selected options from a field.*/
const SelectFilterOptions: React.FunctionComponent<Props> = ({
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
    <div className={selectFilterOptionsCSS.filterOptionsMainDiv}>
      {selectedOptions.map((option, index) => (
        <div>
          {option} {' '}
          <span
            className={selectFilterOptionsCSS.filterItemButton}
            onClick={() => handleOptionRemoval(index)}
          >
            x
          </span>
        </div>
      ))}
    </div>
  )
}

export default SelectFilterOptions
