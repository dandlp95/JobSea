import ApiService from './ApiService'
import IUpdatesApiService from '../interfaces/IUpdatesApiService'
import { PathParams, UpdateRequestDTO } from '../../customTypes/requestTypes'
import { ApiResponse, ApiData, UpdateDTO } from '../../customTypes/responseTypes'

class UpdatesApiService extends ApiService<UpdateDTO> implements IUpdatesApiService {
  constructor (token:string) {
    super(token)
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
    requestBody: UpdateRequestDTO
  ): Promise<ApiData<UpdateDTO> | ApiData<null>> {
    return super.post(url, pathParams, requestBody)
  }

  async putUpdate (
    url: string,
    pathParams: PathParams,
    requestBody: UpdateRequestDTO
  ): Promise<ApiData<UpdateDTO> | ApiData<null>> {
    return super.put(url, pathParams, requestBody)
  }

  async deleteUpdate (url: string, pathParams: PathParams): Promise<Response | ApiData<null>> {
    return super.delete(url, pathParams)
  }
}

export function createUpdatesApiService (): UpdatesApiService {
  const token: string | null = localStorage.getItem('token')
  if (token) {
    return new UpdatesApiService(token)
  } else {
    throw new Error('Invalid Token')
  }
}

