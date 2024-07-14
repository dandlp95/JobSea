import IApplicationApiService from './interfaces/IApplicationApiService'
import { FilterOptions } from '../customTypes/requestTypes'
import { PathParams } from '../customTypes/requestTypes'
import { ApiData, ApplicationDTO } from '../customTypes/responseTypes'
import { isFilterOptionsEmpty } from './filterValidator'
const rows: number = 10

export const getApplications = async (
  userId: string,
  applicationService: IApplicationApiService,
  filters: FilterOptions,
  searchQuery: string | null,
  skip: number
): Promise<ApiData<ApplicationDTO[]> | ApiData<null>> => {
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
    apiData = await applicationService.getApplications(baseUrl + '?' + paginationQuery, pathParam)
    return apiData
  } else {
    if (searchQuery) {
      baseUrl += '/search?search=' + encodeURIComponent(searchQuery) + '&' + paginationQuery
    } else {
      baseUrl += '/search?' + paginationQuery
    }

    apiData = await applicationService.filterApplications(baseUrl, pathParam, filters)
  }

  return apiData
}
