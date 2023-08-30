import { PathParams } from '../../customTypes/requestTypes'
import { ApiResponse, ApiData } from '../../customTypes/responseTypes'

// Interface for ApiService class
interface IApiService<T> {
  get(url: string, pathParams: PathParams | null): Promise<ApiData<T[]> | ApiResponse>
  getSingle(url: string, pathParams: PathParams | null): Promise<ApiData<T> | ApiResponse>
  post(url: string, pathParams: PathParams, body: object): Promise<ApiData<T> | ApiResponse>
  put(url: string, pathParams: PathParams, body: object): Promise<ApiData<T> | ApiResponse>
  delete(url: string, pathParams: PathParams): Promise<Response>
  _formatUrlWithParams(url: string, params: PathParams): string
  _apiCall(
    url: string,
    pathParams: PathParams | null,
    method: string,
    body: object
  ): Promise<Response>
}

export default IApiService
