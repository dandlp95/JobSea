import IApiService from './IApiService'
import {
  ApiData,
  ApiResponse,
  UpdateDTO
} from '../../customTypes/responseTypes'
import {
  UpdateUpdateDTO,
  UpdateCreateDTO
} from '../../customTypes/requestTypes'
import { PathParams } from '../../customTypes/requestTypes'

interface IUpdatesApiService extends IApiService<UpdateDTO> {
  getUpdates(
    url: string,
    pathParams: PathParams
  ): Promise<ApiData<UpdateDTO[]> | ApiResponse>

  getUpdate(
    url: string,
    pathParams: PathParams
  ): Promise<ApiData<UpdateDTO> | ApiResponse>

  postUpdate(
    url: string,
    pathParams: PathParams,
    requestBody: UpdateCreateDTO
  ): Promise<ApiData<UpdateDTO> | ApiResponse>
  putUpdate(
    url: string,
    pathParams: PathParams,
    requestBody: UpdateUpdateDTO
  ): Promise<ApiData<UpdateDTO> | ApiResponse>

  putUpdate(
    url: string,
    pathParams: PathParams,
    requestBody: UpdateUpdateDTO
  ): Promise<ApiData<UpdateDTO> | ApiResponse>
}

export default IUpdatesApiService
