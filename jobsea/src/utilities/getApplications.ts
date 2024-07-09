import IApplicationApiService from './interfaces/IApplicationApiService'
import { FilterOptions } from '../customTypes/requestTypes'
import { PathParams } from '../customTypes/requestTypes'
import { ApiData, ApplicationDTO } from '../customTypes/responseTypes'
import { isFilterOptionsEmpty } from './filterValidator'

export const getApplications = async (
  userId: string,
  applicationService: IApplicationApiService,
  filters: FilterOptions,
  searchQuery: string | null
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

  if (searchQuery) {
    baseUrl += '/search?search=' + encodeURIComponent(searchQuery)
  }

  // if there are no filters set
  if (isFilterOptionsEmpty(filters) && (searchQuery === null || searchQuery === '')) {
    // const ApplicationsApiService = createApplicationApiService()
    apiData = await applicationService.getApplications(baseUrl, pathParam)
    return apiData
  } else {
    apiData = await applicationService.filterApplications(baseUrl, pathParam, filters)
  }

  return apiData
}
