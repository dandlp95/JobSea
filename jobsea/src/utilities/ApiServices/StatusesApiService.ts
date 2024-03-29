import ApiService from './ApiService'
import IStatusesApiService from '../interfaces/IStatusesApiService'
import {
  ApiData,
  ApiResponse,
  StatusOption
} from '../../customTypes/responseTypes'

class StatusesApiService
  extends ApiService<StatusOption>
  implements IStatusesApiService
{
  constructor () {
    super()
  }

  async getStatuses (
    url: string
  ): Promise<ApiData<StatusOption[]> | ApiData<null>> {
    return super.get(url, null)
  }
}

export default new StatusesApiService()
