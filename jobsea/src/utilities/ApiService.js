const token = localStorage.getItem('token')
class ApiService {
  constructor () {
    this.baseURL = 'https://localhost:7283/jobsea/'
    this.headers = {
      Authorization: `Bearer ${token}`, // Your authorization header
      'Content-Type': 'application/json' // Set the appropriate content type
    }
  }

  async get (url, pathParams = {}) {
    return this._apiCall(url, pathParams, 'GET')
  }

  async post (url, pathParams = {}, body) {
    return this._apiCall(url, pathParams, 'POST', body)
  }

  async put (url, pathParams = {}) {
    return this._apiCall(url, pathParams, 'PUT')
  }

  async delete (url, pathParams = {}) {
    return this._apiCall(url, pathParams, 'DELETE')
  }

  _formatUrlWithParams (url, params = {}) {
    const formattedUrl = url.replace(/\{([^}]+)\}/g, (match, param) => {
      if (params.hasOwnProperty(param)) {
        return params[param]
      }
      throw new Error(`Missing value for parameter ${param}`)
    })
    return formattedUrl
  }

  async _apiCall (url, pathParams, method, body = null) {
    const formattedUrl = this._formatUrlWithParams(url, pathParams)
    const options = {
      method: method,
      headers: this.headers
    }
    if (method === 'POST') {
      if (body == null) {
        throw new Error('Body was not passed in POST request')
      }
      options.body = body
    }
    
    const response = await fetch(`${this.baseURL}${formattedUrl}`, options)
    if (response.ok) {
      return response.status !== 204 ? response.json() : response
    }
    throw new Error(`Error fetching api data`)
  }
}

export default new ApiService()
