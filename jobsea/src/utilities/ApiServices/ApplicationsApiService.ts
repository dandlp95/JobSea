import IApplicationApiService from '../interfaces/IApplicationApiService'
import ApiService from './ApiService'
import { ApplicationDTO, ApiData } from '../../customTypes/responseTypes'
import {
  PathParams,
  CreateApplicationDTO,
  UpdateApplicationDTO,
  FilterOptions
} from '../../customTypes/requestTypes'
// import { Path } from 'react-router-dom'
// import { request } from 'http'

class ApplicationApiService extends ApiService<ApplicationDTO> implements IApplicationApiService {
  constructor (token: string) {
    super(token)
  }

  public async getApplications (
    url: string,
    pathParams: PathParams
  ): Promise<ApiData<null> | ApiData<ApplicationDTO[]>> {
    return super.get(url, pathParams)
  }

  public async getApplication (
    url: string,
    PathParams: PathParams
  ): Promise<ApiData<ApplicationDTO> | ApiData<null>> {
    return super.getSingle(url, PathParams)
  }

  public async postApplication (
    url: string,
    PathParams: PathParams,
    requestBody: CreateApplicationDTO
  ) {
    return super.post(url, PathParams, requestBody)
  }

  public async filterApplications (
    url: string,
    PathParams: PathParams,
    requestBody: FilterOptions
  ) {
    return super.postGet(url, PathParams, requestBody)
  }

  public async deleteApplication (url: string, pathParams: PathParams): Promise<Response> {
    const result = await super.delete(url, pathParams)
    if (result instanceof Response) {
      return result
    }
    throw new Error('Unexpected result type')
  }

  public async putApplication (
    url: string,
    pathParams: PathParams,
    requestBody: UpdateApplicationDTO
  ): Promise<ApiData<null> | ApiData<ApplicationDTO>> {
    return super.put(url, pathParams, requestBody)
  }
}

export function createApplicationApiService (): ApplicationApiService {
  //Creating an instance like this each time, will ensure service is not created with
  //invalid token
  const token: string | null = localStorage.getItem('token')
  if (token) {
    return new ApplicationApiService(token)
  } else {
    throw new Error('Invalid Token')
  }
}
