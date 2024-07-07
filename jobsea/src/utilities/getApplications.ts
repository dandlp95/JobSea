import IApplicationApiService from './interfaces/IApplicationApiService'
import { FilterOptions } from '../customTypes/requestTypes'
import { PathParams } from '../customTypes/requestTypes'
import { ApiData, ApplicationDTO } from '../customTypes/responseTypes'
import { isFilterOptionsEmpty } from './filterValidator'

export const getApplications = async (
  userId: string,
  applicationService: IApplicationApiService,
  filters: FilterOptions
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

  // if there are no filters set
  if (isFilterOptionsEmpty(filters)) {
    // const ApplicationsApiService = createApplicationApiService()
    apiData = await applicationService.getApplications('users/{userId}/applications', pathParam)
    return apiData
  } else {
    apiData = await applicationService.filterApplications(
      'users/{userId}/applications/search',
      pathParam,
      filters
    )
  }

  return apiData
}
