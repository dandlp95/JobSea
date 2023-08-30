import IApiService from './IApiService'
import {
  StatusOption,
  ApiData,
  ApiResponse
} from '../../customTypes/responseTypes'

interface IStatusesApiService extends IApiService<ApiData<StatusOption[]>> {
  getStatuses(url: string): Promise<ApiData<StatusOption[]> | ApiResponse>
}

export default IStatusesApiService
