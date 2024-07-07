import { ApplicationDTO, ApiData, ApiResponse } from '../../customTypes/responseTypes'
import { FilterOptions, PathParams } from '../../customTypes/requestTypes'
import { CreateApplicationDTO, UpdateApplicationDTO } from '../../customTypes/requestTypes'

interface IApplicationApiService {
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
  filterApplications(
    url: string,
    pathParams: PathParams,
    requestBody: FilterOptions
  ): Promise<ApiData<ApplicationDTO[]> | ApiData<null>>

  deleteApplication(url: string, pathParams: PathParams): Promise<Response>
  putApplication(
    url: string,
    pathParams: PathParams,
    requestBody: UpdateApplicationDTO
  ): Promise<ApiData<ApplicationDTO> | ApiData<null>>
}

export default IApplicationApiService
