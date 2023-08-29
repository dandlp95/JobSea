import IApiService from './interfaces/IApiService'
import { PathParams } from '../customObjects/customObjects'

const token = localStorage.getItem('token')

class ApiService<T> implements IApiService<T> {
  private _baseURL: string
  private _headers: HeadersInit

  constructor () {
    this._baseURL = 'https://localhost:7283/jobsea/'
    this._headers = {
      Authorization: `Bearer ${token}`, // Your authorization header
      'Content-Type': 'application/json' // Set the appropriate content type
    }
  }

  async get (url: string, pathParams: PathParams): Promise<T> {
    return this._apiCall(url, pathParams, 'GET')
  }

  async post (
    url: string,
    pathParams: PathParams,
    body: object = {}
  ): Promise<T> {
    return this._apiCall(url, pathParams, 'POST', body)
  }

  async put (url: string, pathParams: PathParams, body: object): Promise<T> {
    return this._apiCall(url, pathParams, 'PUT', body)
  }

  async delete (url: string, pathParams: PathParams): Promise<Response> {
    return this._apiCall(url, pathParams, 'DELETE')
  }

  _formatUrlWithParams (url: string, params: PathParams): string {
    const formattedUrl: string = url.replace(/\{([^}]+)\}/g, (match, param) => {
      const paramKey: keyof PathParams = param as keyof PathParams
      return String(params[paramKey])
    })
    return formattedUrl
  }

  async _apiCall (
    url: string,
    pathParams: PathParams,
    method: string,
    body: object = {}
  ) {
    const formattedUrl: string = this._formatUrlWithParams(url, pathParams)
    const options: RequestInit = {
      method: method,
      headers: this._headers,
      body: undefined
    }

    if (method === 'POST') {
      if (Object.keys(body).length === 0) {
        throw new Error('Body was not passed in POST request')
      }
      options.body = JSON.stringify(body)
    }

    const response = await fetch(`${this._baseURL}${formattedUrl}`, options)
    if (!response.ok) {
      throw new Error(`Error fetching api data`)
    }
    return response.status !== 204 ? response.json() : response
  }
}

export default new ApiService()
