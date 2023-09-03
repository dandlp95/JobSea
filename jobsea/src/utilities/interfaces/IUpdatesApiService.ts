import { ApiData, ApiResponse, UpdateDTO } from '../../customTypes/responseTypes'
import { UpdateRequestDTO } from '../../customTypes/requestTypes'
import { PathParams } from '../../customTypes/requestTypes'

interface IUpdatesApiService {
  getUpdates(url: string, pathParams: PathParams): Promise<ApiData<UpdateDTO[]> | ApiData<null>>

  getUpdate(url: string, pathParams: PathParams): Promise<ApiData<UpdateDTO> | ApiData<null>>

  postUpdate(
    url: string,
    pathParams: PathParams,
    requestBody: UpdateRequestDTO
  ): Promise<ApiData<UpdateDTO> | ApiData<null>>
  putUpdate(
    url: string,
    pathParams: PathParams,
    requestBody: UpdateRequestDTO
  ): Promise<ApiData<UpdateDTO> | ApiData<null>>

  deleteUpdate(url: string, pathParams: PathParams): Promise<Response | ApiData<null>>
}

export default IUpdatesApiService
