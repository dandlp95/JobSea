import IApplicationApiService from './interfaces/IApplicationApiService'
import { FilterOptions } from '../customTypes/requestTypes'
import { PathParams } from '../customTypes/requestTypes'
import { ApiData, ApplicationDTO } from '../customTypes/responseTypes'
import { isFilterOptionsEmpty } from './filterValidator'
const rows: number = 8

export const getApplications = async (
  userId: string,
  applicationService: IApplicationApiService,
  filters: FilterOptions,
  searchQuery: string | null,
  skip: number
): Promise<ApiData<ApplicationDTO[]> | ApiData<null>> => {
  console.log('skip in getapplications: ', skip)
  const pathParam: PathParams = {
    userId: parseInt(userId)
  }

  var apiData: ApiData<ApplicationDTO[]> | ApiData<null> = {
    statusCode: 0,
    isSuccess: false,
    errors: null,
    result: null,
    token: null
  }

  var baseUrl = 'users/{userId}/applications'
  const paginationQuery = `skip=${skip}&rows=${rows}`

  // if there are no filters set
  if (isFilterOptionsEmpty(filters) && (searchQuery === null || searchQuery === '')) {
    // const ApplicationsApiService = createApplicationApiService()
    console.log('first ', baseUrl + '?' + paginationQuery)
    apiData = await applicationService.getApplications(baseUrl + '?' + paginationQuery, pathParam)
  } else {
    if (searchQuery) {
      baseUrl += '/search?search=' + encodeURIComponent(searchQuery) + '&' + paginationQuery
      console.log('second ', baseUrl)
    } else {
      baseUrl += '/search?' + paginationQuery
      console.log('third ', baseUrl)
    }
    apiData = await applicationService.filterApplications(baseUrl, pathParam, filters)
  }
  return apiData
}
