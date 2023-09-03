// import IApiService from './interfaces/IApiService'
import { PathParams } from '../../customTypes/requestTypes'
import { ApiData, ApiResponse } from '../../customTypes/responseTypes'

// const token: string | null = localStorage.getItem('token')

abstract class ApiService<T> {
  private _baseURL: string
  private _headers: HeadersInit

  constructor (token?:string) {
    this._baseURL = 'https://localhost:7283/jobsea/'
    this._headers = {
      Authorization: `Bearer ${token}`, // Your authorization header
      'Content-Type': 'application/json' // Set the appropriate content type
    }
  }

  protected async get (
    url: string,
    pathParams: PathParams | null
  ): Promise<ApiData<T[]> | ApiData<null>> {
    // with ApiResponse type, you can put this in a try catch or handle scenarios where
    // backend respond was not okay.
    const response: Response = await this._apiCall(url, pathParams, 'GET')
    return response.json()
  }

  protected async getSingle (
    url: string,
    pathParams: PathParams | null
  ): Promise<ApiData<T> | ApiData<null>> {
    // with ApiResponse type, you can put this in a try catch or handle scenarios where
    // backend respond was not okay.
    const response: Response = await this._apiCall(url, pathParams, 'GET')
    return response.json()
  }

  protected async post (
    url: string,
    pathParams: PathParams,
    body: object = {}
  ): Promise<ApiData<T> | ApiData<null>> {
    const response: Response = await this._apiCall(
      url,
      pathParams,
      'POST',
      body
    )
    return response.json()
  }

  protected async put (
    url: string,
    pathParams: PathParams,
    body: object
  ): Promise<ApiData<T> | ApiData<null>> {
    const response: Response = await this._apiCall(url, pathParams, 'PUT', body)
    return response.json()
  }

  protected async delete (url: string, pathParams: PathParams): Promise<Response | ApiData<null>> {
    return this._apiCall(url, pathParams, 'DELETE')
  }

  private _formatUrlWithParams (url: string, params: PathParams): string {
    const formattedUrl: string = url.replace(/\{([^}]+)\}/g, (match, param) => {
      const paramKey: keyof PathParams = param as keyof PathParams
      return String(params[paramKey])
    })
    return formattedUrl
  }

  private async _apiCall (
    url: string,
    pathParams: PathParams | null,
    method: string,
    body: object = {}
  ): Promise<Response> {
    var formattedUrl: string
    if (pathParams !== null) {
      formattedUrl = this._formatUrlWithParams(url, pathParams)
    } else {
      formattedUrl = url
    }
    const options: RequestInit = {
      method: method,
      headers: this._headers,
      body: undefined
    }
    if (method === 'POST' || method === 'PUT') {
      if (Object.keys(body).length === 0) {
        throw new Error('Body has to be passed in PUT or POST request.')
      }
      options.body = JSON.stringify(body)
    }

    const response = await fetch(`${this._baseURL}${formattedUrl}`, options)
    console.log('response:', response)
    console.log('Params passed: ', pathParams)
    console.log('options: ', options)
    if (!response.ok) {
      throw new Error(`Error fetching api data ${JSON.stringify(response)}`)
    }
    return response
  }
}

export default ApiService
