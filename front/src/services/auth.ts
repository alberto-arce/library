import { api } from "./api";

interface IUser {
  name: string;
  password: string;
}

interface IResponse {
  user?: {
    name: string;
  };
  token?: string;
  error?: string;
  success: boolean;
}

interface IService {
  login: (user: IUser) => Promise<IResponse>;
}

export const authService: IService = {
  login: (user: IUser) => api.post("/auth/login", user),
};
