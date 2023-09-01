import { PathParams } from '../../customTypes/requestTypes'
import { ApiResponse, ApiData } from '../../customTypes/responseTypes'

// Interface for ApiService class
interface IApiService<T> {
  get(
    url: string,
    pathParams: PathParams | null
  ): Promise<ApiData<T[]> | ApiData<null>>
  getSingle(
    url: string,
    pathParams: PathParams | null
  ): Promise<ApiData<T> | ApiData<null>>
  post(
    url: string,
    pathParams: PathParams,
    body: object
  ): Promise<ApiData<T> | ApiData<null>>
  put(
    url: string,
    pathParams: PathParams,
    body: object
  ): Promise<ApiData<T> | ApiData<null>>
  delete(url: string, pathParams: PathParams): Promise<Response | ApiData<null>>
  _formatUrlWithParams(url: string, params: PathParams): string
  _apiCall(
    url: string,
    pathParams: PathParams | null,
    method: string,
    body: object
  ): Promise<Response>
}

export default IApiService