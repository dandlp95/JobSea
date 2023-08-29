export type StatusOption = {
  statusId: number
  statusName: String
}

export type PathParams = {
  userId: number | null
  applicationId: number | null
  updateId: number | null
}

export type ApplicationDTO = {
  applicationId: number
  Company: string
  JobTitle: string
  Salary: string
  Location: string | null
  Link: string | null
  Comments: string | null
  Created: string
  LastUpdated: string
  userId: number
}

export type Status = {
  StatusId: string
  StatusName: string
}

export type UpdateDTO = {
  UpdateId: number
  Created: string
  EventDate: string | null
  EvemtTime: string | null
  notes: string
  Status: Status
  ApplicationId: string
}

export type UserDTO = {
  UserId: number
  Username: string
  email: string
  CreatedDate: string
}

type ApiResponse<T> = {
  isSuccess: boolean
  statusCode: number
  data: T
}

export type ApiData<T> = {
  StatusCode: number
  IsSuccess: boolean
  Errors: string[]
  Result: T
  Token: string
}
