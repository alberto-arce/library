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

interface IUpdateUser {
  name: string;
}

interface IService {
  getAll: () => Promise<IResponse>;
  create: (newUser: ICreateUser) => Promise<IResponse>;
  update: (_id: string, updateUser: IUpdateUser) => Promise<IResponse>;
  delete: (_id: string) => Promise<IResponse>;
}

export const userService: IService = {
  getAll: () => api.get("/users"),
  create: (newUser: ICreateUser) => api.post('/users/', newUser),
  update: (_id: string, updateUser: IUpdateUser) => api.put(`/users/${_id}`, updateUser),
  delete: (_id: string) => api.delete(`/users/${_id}`),
};