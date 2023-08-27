import { useEffect, useState } from 'react'
import apiService from '../utilities/ApiService'

export function useStatusOptions () {
  const [statusOptions, setStatusOptions] = useState()

  useEffect(() => {
    try {
      const getStatusOptions = () => {
        apiService.get('statusOptions').then(response => {
          localStorage.setItem('statusOptions', JSON.stringify(response.result))
          setStatusOptions(response.result)
        })
      }

      const storedStatusOptions = localStorage.getItem('statusOptions')
      storedStatusOptions
        ? setStatusOptions(JSON.parse(storedStatusOptions))
        : getStatusOptions()
    } catch (error) {
      console.error('Error fetching status options: ', error)
    }
  }, [])
  return statusOptions
}
