import { useEffect, useState } from 'react'
import ModalitiesApiService from '../utilities/ApiServices/ModalitiesApiService'
import { Modality } from '../customTypes/responseTypes'

function useModalities () {
  const [modalities, setModalities] = useState<Modality[]>([])

  useEffect(() => {
    try {
      const getModalities = () => {
        ModalitiesApiService.getModalities().then(apiResponse => {
          if (apiResponse.result) {
            localStorage.setItem('modalities', JSON.stringify(apiResponse.result))
            setModalities(apiResponse.result)
          }
        })
      }

      const modalities = localStorage.getItem('modalities')
      modalities ? setModalities(JSON.parse(modalities)) : getModalities()
    } catch (err) {
      console.error('Error fetchin modalities: ', err)
    }
  }, [])

  return modalities
}

export default useModalities
