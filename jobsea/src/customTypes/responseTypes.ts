export type StatusOption = {
  statusId: number
  statusName: String
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

export type ApiResponse = {
  isSuccess: boolean
  statusCode: number
  data: string
}

export type ApiData<T> = {
  StatusCode: number
  IsSuccess: boolean
  Errors: string[]
  Result: T | null
  Token: string
}
