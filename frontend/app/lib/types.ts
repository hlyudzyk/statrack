export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  birthday: string;
  avatarUrl: string;
  status: string;
  department: string;
  authorities: string[];
};

export type RoleStatusValue = {
  label:string;
  value:string;
};

export type ApiError = {
  code: string;
  message: string;
  timestamp: Date;
}