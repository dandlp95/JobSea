import IApiService from './IApiService'
import {
  ApiData,
  ApiResponse,
  UpdateDTO
} from '../../customTypes/responseTypes'
import { UpdateUpdateDTO, UpdateCreateDTO } from '../../customTypes/requestTypes'
import { PathParams } from '../../customTypes/requestTypes'

interface IUpdatesApiService extends IApiService<ApiData<UpdateDTO>> {
  getUpdates(
    url: string,
    pathParams: PathParams | null
  ): Promise<ApiData<UpdateDTO[]>>

  postUpdate(
    url: string,
    pathParams: PathParams,
    requestBody: UpdateCreateDTO
  ): Promise<ApiData<UpdateDTO>>

  putUpdate(
    url: string,
    pathParams: PathParams,
    requestBody: UpdateUpdateDTO
  ): Promise<ApiData<UpdateDTO>>

  putUpdate(
    url: string,
    pathParams: PathParams,
  ): Promise<ApiData<UpdateDTO>>  
}

export default IUpdatesApiService
