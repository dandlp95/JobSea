import IApplicationApiService from './interfaces/IApplicationApiService'
import ApiService from './ApiService'
import { ApplicationDTO, ApiData } from '../customTypes/responseTypes'
import { PathParams, CreateApplicationDTO, UpdateApplicationDTO } from '../customTypes/requestTypes'
import { Path } from 'typescript'

class ApplicationApiService extends ApiService<ApplicationDTO> implements IApplicationApiService {
  constructor () {
    super()
  }

  async getApplications (
    url: string,
    pathParams: PathParams
  ): Promise<ApiData<null> | ApiData<ApplicationDTO[]>> {
    return super.get(url, pathParams)
  }

  async getApplication (
    url: string,
    PathParams: PathParams
  ): Promise<ApiData<ApplicationDTO> | ApiData<null>> {
    return super.getSingle(url, PathParams)
  }

  async postApplication (url: string, PathParams: PathParams, requestBody: CreateApplicationDTO) {
    return super.post(url, PathParams, requestBody)
  }

  async deleteApplication (url: string, pathParams: PathParams): Promise<Response> {
    const result = await super.delete(url, pathParams)
    if (result instanceof Response) {
      return result
    }
    throw new Error('Unexpected result type')
  }

  async putApplication (
    url: string,
    pathParams: PathParams,
    requestBody: UpdateApplicationDTO
  ): Promise<ApiData<null> | ApiData<ApplicationDTO>> {
    return super.put(url, pathParams, requestBody)
  }
}

export default new ApplicationApiService()
