import { Modality } from '../../customTypes/responseTypes'
import { ApiData } from '../../customTypes/responseTypes'

interface IModalityApiService {
  getModalities(): Promise<ApiData<Modality []> | ApiData<null>>
}

export default IModalityApiService
