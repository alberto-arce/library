import { api } from "./api";
import { IUser } from "../components/User/interfaces";

interface IResponse {
  data?: IUser[];
  error?: string;
  success: boolean;
}

interface ICreateUser {
  name: string;
  password: string;
}

interface IService {
  getUsers: () => Promise<IResponse>;
  createUser: (newUser: ICreateUser) => Promise<IResponse>;
  deleteUser: (_id: string) => Promise<IResponse>;
}

export const userService: IService = {
  getUsers: () => api.get("/users"),
  createUser: (newUser: ICreateUser) => api.post('/users/', newUser),
  deleteUser: (_id: string) => api.delete(`/users/${_id}`),
};