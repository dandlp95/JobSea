import IApiService from './IApiService'
import { ApplicationDTO, ApiData, ApiResponse } from '../../customTypes/responseTypes'
import { PathParams } from '../../customTypes/requestTypes'
import { CreateApplicationDTO, UpdateApplicationDTO } from '../../customTypes/requestTypes'

interface IApplicationApiService extends IApiService<ApplicationDTO> {
  getApplications(
    url: string,
    pathParams: PathParams
  ): Promise<ApiData<ApplicationDTO[]> | ApiData<null>>
  getApplication(
    url: string,
    pathParams: PathParams
  ): Promise<ApiData<ApplicationDTO> | ApiData<null>>
  postApplication(
    url: string,
    pathParams: PathParams,
    requestBody: CreateApplicationDTO
  ): Promise<ApiData<ApplicationDTO> | ApiData<null>>
  deleteApplication(url: string, pathParams: PathParams): Promise<Response>
  putApplication(
    url: string,
    pathParams: PathParams,
    requestBody: UpdateApplicationDTO
  ): Promise<ApiData<ApplicationDTO> | ApiData<null>>
}

export default IApplicationApiService
