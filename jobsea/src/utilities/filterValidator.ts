import { FilterOptions } from '../customTypes/requestTypes'

export const isFilterOptionsEmpty = (filterOptions: FilterOptions) : boolean=> {
  return (
    isPropertyEmpty(filterOptions, 'Cities') &&
    isPropertyEmpty(filterOptions, 'Company') &&
    isPropertyEmpty(filterOptions, 'Modalities') &&
    isPropertyEmpty(filterOptions, 'SalaryRange') &&
    isPropertyEmpty(filterOptions, 'States') &&
    isPropertyEmpty(filterOptions, 'StatusId')
  )
}

const isPropertyEmpty = (filterOptions: FilterOptions, property: keyof FilterOptions): boolean => {
  const value = filterOptions[property]

  if (value == null) return true

  if (Array.isArray(value)) {
    return value.length == 0
  }

  if (typeof value === 'object') {
    return value.max == null && value.min == null
  }

  return true
}
