import { UserDTO, ApiData } from '../../customTypes/responseTypes'
import { LoginInfo, PathParams, UserCreateDTO } from '../../customTypes/requestTypes'

interface IUsersApiService {
  getUsers(url: string, pathParams: PathParams): Promise<ApiData<UserDTO[]> | ApiData<null>>
  getUser(url: string, pathParams: PathParams): Promise<ApiData<UserDTO> | ApiData<null>>
  delete(url: string, pathParams: PathParams): Promise<Response | ApiData<null>>
}

export default IUsersApiService
