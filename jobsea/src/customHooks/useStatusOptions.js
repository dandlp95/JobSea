import { React, useEffect, useState } from 'react'

export function useStatusOptions () {
  const [statusOptions, setStatusOptions] = useState()

  useEffect(() => {
    try {
      const getStatusOptions = async () => {
        const options = {
          method: 'GET',
          headers: { 'Content-type': 'application/json' }
        }
        const response = await fetch(
          'https://localhost:7283' + '/jobsea/statusOptions',
          options
        )
        if (response.ok) {
          const responseObject = await response.json()
          localStorage.setItem(
            'statusOptions',
            JSON.stringify(responseObject.result)
          )
          setStatusOptions(responseObject.result)
        }
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
