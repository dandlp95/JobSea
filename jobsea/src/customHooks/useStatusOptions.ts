import { useEffect, useState } from 'react'
import StatusesApiService from '../utilities/ApiServices/StatusesApiService'
import { StatusOption } from '../customTypes/responseTypes'

function useStatusOptions () {
  const [statusOptions, setStatusOptions] = useState<StatusOption[]>([])

  useEffect(() => {
    console.log('statuses use effect entered.')
    try {
      const getStatusOptions = () => {
        StatusesApiService.getStatuses('statuses').then(response => {
          if (response.result) {
            console.log(response)
            localStorage.setItem('statusOptions', JSON.stringify(response.result))
            setStatusOptions(response.result)
          }
        })
      }

      const storedStatusOptions = localStorage.getItem('statusOptions')
      storedStatusOptions ? setStatusOptions(JSON.parse(storedStatusOptions)) : getStatusOptions()
    } catch (error) {
      console.error('Error fetching status options: ', error)
    }
  }, [])
  return statusOptions
}

export default useStatusOptions
