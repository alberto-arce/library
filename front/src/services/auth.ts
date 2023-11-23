import { api } from "./api";
import {ILoginResponse} from "./interface";

interface IUser {
  name: string;
  password: string;
}

// export interface IResponse {
//   user?: {
//     name: string;
//     role: string;
//   };
//   token?: string;
//   error?: string;
//   success: boolean;
// }

interface IService {
  login: (user: IUser) => Promise<ILoginResponse>;
}

export const authService: IService = {
  login: (user: IUser) => api.post("/auth/login", user),
};
