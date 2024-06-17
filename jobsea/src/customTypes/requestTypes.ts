export type PathParams = {
  userId?: number;
  applicationId?: number;
  updateId?: number;
};

export type UpdateRequestDTO = {
  eventDate: string | null;
  eventTime: string | null;
  notes: string | null;
  statusId: number;
};

export type CreateApplicationDTO = {
  company: string;
  jobTitle: string;
  salary: number | null;
  city: string | null;
  state: string | null;
  link: string | null;
  jobDetails: string | null;
  comments: string | null;
  modalityId: string | null;
  firstUpdate: UpdateRequestDTO;
};

export type UpdateApplicationDTO = {
  company: string;
  jobTitle: string;
  salary: number | null;
  city: string | null;
  state: string | null;
  modalityId: string | null;
  link: string | null;
  jobDetails: string | null;
  comments: string | null;
};

export type UserCreateDTO = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginInfo = {
  username: string;
  password: string;
};

export type FilterOptions = {
  Company: string[];
  Cities: string[];
  States: string[];
  Modalities?: number[]  | null;
  StatusId?: number[] | null; 
  SalaryRange: {min?: number | null, max?:number | null}
}