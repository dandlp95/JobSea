export type PathParams = {
  userId?: number;
  applicationId?: number;
  updateId?: number;
};

// export type UpdateUpdateDTO = {
//   eventDate: string | null;
//   eventTime: string | null;
//   notes: string | null;
//   statusId: number;
// };

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
  location: string | null;
  link: string | null;
  comments: string | null;
  firstUpdate: UpdateRequestDTO;
};

export type UpdateApplicationDTO = {
  company: string;
  jobTitle: string;
  salary: number | null;
  location: string | null;
  link: string | null;
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
