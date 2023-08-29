import { PathParams } from "../../customObjects/customObjects"

// Interface for ApiService class
interface IApiService<T> {
  get(url: string, pathParams: PathParams): Promise<T>
  post(url: string, pathParams: PathParams, body: object): Promise<T>
  put(url: string, pathParams: PathParams, body: object): Promise<T>
  delete(url: string, pathParams: PathParams): Promise<Response>
  _formatUrlWithParams(url: string, params: PathParams): string
  _apiCall(
    url: string,
    pathParams: object,
    method: string,
    body: object
  ): Promise<T | Response>
}

export default IApiService
