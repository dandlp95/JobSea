import IUsersApiService from './interfaces/IUsersApiService'
import ApiService from './ApiService'
import { UserDTO, ApiData } from '../customTypes/responseTypes'
import { PathParams, UserCreateDTO, LoginInfo } from '../customTypes/requestTypes'

class UsersApiService extends ApiService<UserDTO> implements IUsersApiService {
  constructor () {
    super()
  }

  getUsers (url: string, pathParams: PathParams): Promise<ApiData<UserDTO[]> | ApiData<null>> {
    return super.get(url, pathParams)
  }
  getUser (url: string, pathParams: PathParams): Promise<ApiData<UserDTO> | ApiData<null>> {
    return super.getSingle(url, pathParams)
  }
  postUser (
    url: string,
    pathParams: PathParams,
    requestBody: UserCreateDTO
  ): Promise<ApiData<UserDTO> | ApiData<null>> {
    return super.post(url, pathParams, requestBody)
  }
  auth (
    url: string,
    pathParams: PathParams,
    requestBody: LoginInfo
  ): Promise<ApiData<UserDTO> | ApiData<null>> {
    return super.post(url, pathParams, requestBody)
  }

  delete (url: string, pathParams: PathParams): Promise<Response | ApiData<null>> {
    return super.delete(url, pathParams)
  }
}

export default new UsersApiService();
