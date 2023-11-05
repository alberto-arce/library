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
  getUsers: () => Promise<IResponse>;
  createUser: (newUser: ICreateUser) => Promise<IResponse>;
  updateUser: (_id: string, updateUser: IUpdateUser) => Promise<IResponse>;
  deleteUser: (_id: string) => Promise<IResponse>;
}

export const userService: IService = {
  getUsers: () => api.get("/users"),
  createUser: (newUser: ICreateUser) => api.post('/users/', newUser),
  updateUser: (_id: string, updateUser: IUpdateUser) => api.put(`/users/${_id}`, updateUser),
  deleteUser: (_id: string) => api.delete(`/users/${_id}`),
};