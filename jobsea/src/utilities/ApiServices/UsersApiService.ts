import IUsersApiService from '../interfaces/IUsersApiService'
import ApiService from './ApiService'
import { UserDTO, ApiData } from '../../customTypes/responseTypes'
import { PathParams, UserCreateDTO, LoginInfo } from '../../customTypes/requestTypes'

class UsersApiService extends ApiService<UserDTO> implements IUsersApiService {
  constructor (token: string) {
    super(token)
  }

  getUsers (url: string, pathParams: PathParams): Promise<ApiData<UserDTO[]> | ApiData<null>> {
    return super.get(url, pathParams)
  }
  getUser (url: string, pathParams: PathParams): Promise<ApiData<UserDTO> | ApiData<null>> {
    return super.getSingle(url, pathParams)
  }

  delete (url: string, pathParams: PathParams): Promise<Response | ApiData<null>> {
    return super.delete(url, pathParams)
  }
}
export function createUsersApiService (): UsersApiService {
  const token: string | null = localStorage.getItem('token')
  if (token) {
    return new UsersApiService(token)
  } else {
    throw new Error('Invalid Token')
  }
}
