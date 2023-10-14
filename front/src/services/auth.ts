import { api } from "./api";

interface IUser {
  name: string;
  password: string;
}

interface IService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login: (user: IUser) => Promise<any>;
}

export const authService: IService = {
  login: (user: IUser) => api.post("/auth/login", user)
};
