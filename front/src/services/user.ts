import { api } from "./api";

interface IUser {
  _id: string;
  name: string;
  password: string;
}

interface IDeleteResponse {
  message: string;
  ok: boolean;
}

interface ICreateUser {
  name: string;
  password: string;
}

interface IService {
  getUsers: () => Promise<IUser[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createUser: (newUser: ICreateUser) => Promise<any>;
  deleteUser: (_id: string) => Promise<IDeleteResponse>;
}

export const userService: IService = {
  getUsers: () => api.get("/users"),
  createUser: (newUser: ICreateUser) => api.post('/users/', newUser),
  deleteUser: (_id: string) => api.delete(`/users/${_id}`),
};