import IApiService from './IApiService'
import { ApiData, ApiResponse, UpdateDTO } from '../../customTypes/responseTypes'
import { UpdateUpdateDTO, UpdateCreateDTO } from '../../customTypes/requestTypes'
import { PathParams } from '../../customTypes/requestTypes'

interface IUpdatesApiService extends IApiService<UpdateDTO> {
  getUpdates(url: string, pathParams: PathParams): Promise<ApiData<UpdateDTO[]> | ApiData<null>>

  getUpdate(url: string, pathParams: PathParams): Promise<ApiData<UpdateDTO> | ApiData<null>>

  postUpdate(
    url: string,
    pathParams: PathParams,
    requestBody: UpdateCreateDTO
  ): Promise<ApiData<UpdateDTO> | ApiData<null>>
  putUpdate(
    url: string,
    pathParams: PathParams,
    requestBody: UpdateUpdateDTO
  ): Promise<ApiData<UpdateDTO> | ApiData<null>>

  deleteUpdate(url: string, pathParams: PathParams): Promise<Response | ApiData<null>>
}

export default IUpdatesApiService
