import { IProduct } from "../product/product";

export interface ICurrentUser {
  username: string;
  email: string;
  products?: IProduct[];

}

export interface IUser {
  username: string;
  email: string;
  password: string;
  products?: IProduct[];
}


export interface IUserRequest {
  email: string;
  password: string;
}
