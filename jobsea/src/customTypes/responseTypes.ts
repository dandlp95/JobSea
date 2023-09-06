export type StatusOption = {
  statusId: number
  statusName: string
}

export type ApplicationDTO = {
  applicationId: number
  company: string
  jobTitle: string
  salary: string
  location: string | null
  link: string | null
  comments: string | null
  modalityId: string | null
  created: string
  lastUpdated: string
  userId: number
}

export type Status = {
  statusId: string
  statusName: string
}

export type UpdateDTO = {
  updateId: number
  created: string
  eventDate: string | null
  eventTime: string | null
  notes: string
  status: Status
  applicationId: string
}

export type UserDTO = {
  userId: number
  username: string
  email: string
  createdDate: string
}

export type Modality = {
  modalityId: number
  name: string
}

export type ApiResponse = {
  isSuccess: boolean
  statusCode: number
  data: string
}

export type ApiData<T> = {
  statusCode: number
  isSuccess: boolean
  errors: string[] | null
  result: T | null
  token: string | null
}
