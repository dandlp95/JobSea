import IApiService from './IApiService'
import { UserDTO, ApiData } from '../../customTypes/responseTypes'
import { LoginInfo, PathParams, UserCreateDTO } from '../../customTypes/requestTypes'

interface IUsersApiService extends IApiService<UserDTO> {
  getUsers(url: string, pathParams: PathParams): Promise<ApiData<UserDTO[]> | ApiData<null>>
  getUser(url: string, pathParams: PathParams): Promise<ApiData<UserDTO> | ApiData<null>>
  postUser(
    url: string,
    pathParams: PathParams,
    requestBody: UserCreateDTO
  ): Promise<ApiData<UserDTO> | ApiData<null>>
  auth(
    url: string,
    pathParams: PathParams,
    requestBody: LoginInfo
  ): Promise<ApiData<UserDTO> | ApiData<null>>
  delete(url: string, pathParams: PathParams): Promise<Response | ApiData<null>>
}

export default IUsersApiService
