import { State, City, ApiData, ApiResponse } from '../../customTypes/responseTypes'
import ApiService from './ApiService'

class GetLocations extends ApiService<State | City> {
  private _countryId: number
  constructor () {
    super()
    this._countryId = 233
  }

  async getStates (): Promise<ApiData<(State | City)[]> | ApiData<null>> {
    const response = await this.get(`locations?country=${this._countryId}`, null)
    return response
  }

  async getCities (stateId: string): Promise<ApiData<(State | City)[]> | ApiData<null>> {
    const response = await this.get(`locations?state=${stateId}`, null)
    return response
  }
}

export default new GetLocations()
