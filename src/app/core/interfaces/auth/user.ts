export interface ICurrentUser {
  username: string;
  email: string;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
}


export interface IUserRequest {
  email: string;
  password: string;
}
