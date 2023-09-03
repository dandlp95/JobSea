import {
  StatusOption,
  ApiData,
  ApiResponse
} from '../../customTypes/responseTypes'

interface IStatusesApiService {
  getStatuses(url: string): Promise<ApiData<StatusOption[]> | ApiData<null>>
}

export default IStatusesApiService
