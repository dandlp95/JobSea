import ApiService from './ApiService'
import IUpdatesApiService from './interfaces/IUpdatesApiService'
import { PathParams, UpdateCreateDTO, UpdateUpdateDTO } from '../customTypes/requestTypes'
import { ApiResponse, ApiData, UpdateDTO } from '../customTypes/responseTypes'

class UpdatesApiService extends ApiService<UpdateDTO> implements IUpdatesApiService {
  constructor () {
    super()
  }

  async getUpdates (
    url: string,
    pathParams: PathParams
  ): Promise<ApiData<UpdateDTO[]> | ApiData<null>> {
    return super.get(url, pathParams)
  }

  async getUpdate (
    url: string,
    pathParams: PathParams
  ): Promise<ApiData<UpdateDTO> | ApiData<null>> {
    return super.getSingle(url, pathParams)
  }

  async postUpdate (
    url: string,
    pathParams: PathParams,
    requestBody: UpdateCreateDTO
  ): Promise<ApiData<UpdateDTO> | ApiData<null>> {
    return super.post(url, pathParams, requestBody)
  }

  async putUpdate (
    url: string,
    pathParams: PathParams,
    requestBody: UpdateUpdateDTO
  ): Promise<ApiData<UpdateDTO> | ApiData<null>> {
    return super.put(url, pathParams, requestBody)
  }

  async deleteUpdate (url: string, pathParams: PathParams): Promise<Response | ApiData<null>> {
    return super.delete(url, pathParams)
  }
}

export default new UpdatesApiService()
