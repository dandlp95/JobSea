export type PathParams = {
  userId: number | null
  applicationId: number | null
  updateId: number | null
}

export type UpdateUpdateDTO = {
  EventDate: string | null
  EventTime: string | null
  notes: string | null
  StatusId: number
}

export type UpdateCreateDTO = {
  EventDate: string | null
  EventTime: string | null
  StatusId: number
}

export type CreateApplicationDTO = {
  Company: string
  JobTitle: string
  Salary: number | null
  Location: string | null
  Link: string | null
  Comments: string | null
  firstUpdate: UpdateCreateDTO
}

export type UpdateApplicationDTO = {
  Company: string
  JobTitle: string
  Salary: number | null
  Location: string | null
  Link: string | null
  Comments: string | null
}
