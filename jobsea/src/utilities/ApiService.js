class ApiService {
  constructor () {
    ;(this.baseURL = 'https://localhost:7283/jobsea/'),
      (this.headers = {
        Authorization: `'Bearer ${localStorage.getItem('token')}`, // Your authorization header
        'Content-Type': 'application/json' // Set the appropriate content type
      })
  }

  async get (url, pathParams = {}) {
    this._apiCall(url, pathParams, 'GET')
  }

  async post (url, pathParams = {}) {
    this._apiCall(url, pathParams, 'POST')
  }

  async put (url, pathParams = {}) {
    this._apiCall(url, pathParams, 'PUT')
  }

  async delete (url, pathParams = {}) {
    this._apiCall(url, pathParams, 'DELETE')
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

  async _apiCall (url, pathParams, method) {
    const formattedUrl = this._formatUrlWithParams(url, pathParams)
    const options = {
      method: method,
      headers: this.headers
    }
    const response = await fetch(`${this.baseURL}${formattedUrl}`, options)
    return response.json()
  }
}

export default new ApiService();