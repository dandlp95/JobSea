import { State, City, ApiData, ApiResponse } from '../../customTypes/responseTypes'
import ApiService from './ApiService'

class StatesApiService extends ApiService<State> {
  private _countryId: number
  constructor () {
    super()
    this._countryId = 233
  }

  async getStates (): Promise<ApiData<State[]> | ApiData<null>> {
    const response = await this.get(`locations?country=${this._countryId}`, null)
    return response
  }
}

class CitiesApiService extends ApiService<City> {
  constructor () {
    super()
  }

  async getCities (stateId: number): Promise<ApiData<City[]> | ApiData<null>> {
    const response = await this.get(`locations?state=${stateId}`, null)
    return response
  }
}

const citiesApiServiceInstance = new CitiesApiService()
const statesApiServiceInstance = new StatesApiService()

export { citiesApiServiceInstance, statesApiServiceInstance }
