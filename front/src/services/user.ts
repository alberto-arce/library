import { api } from "./api";
import { IUserResponse } from "./interface";

interface ICreateUser {
  name: string;
  password: string;
}

interface IUpdateUser {
  name: string;
}

interface IService {
  getAll: () => Promise<IUserResponse>;
  create: (newUser: ICreateUser) => Promise<IUserResponse>;
  update: (_id: string, updateUser: IUpdateUser) => Promise<IUserResponse>;
  delete: (_id: string) => Promise<IUserResponse>;
}

export const userService: IService = {
  getAll: () => api.get("/users"),
  create: (newUser: ICreateUser) => api.post("/users/", newUser),
  update: (_id: string, updateUser: IUpdateUser) =>
    api.put(`/users/${_id}`, updateUser),
  delete: (_id: string) => api.delete(`/users/${_id}`),
};
