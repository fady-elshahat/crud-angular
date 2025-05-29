import { ICurrentUser } from "./user";

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: ICurrentUser
}
