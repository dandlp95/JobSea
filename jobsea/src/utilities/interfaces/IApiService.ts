import { PathParams } from '../../customTypes/requestTypes'
import { ApiResponse } from '../../customTypes/responseTypes'

// Interface for ApiService class
interface IApiService<T> {
  get(url: string, pathParams: PathParams | null): Promise<T | ApiResponse>
  post(url: string, pathParams: PathParams, body: object): Promise<T | ApiResponse>
  put(url: string, pathParams: PathParams, body: object): Promise<T | ApiResponse>
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
