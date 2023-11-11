import { api } from "./api";

import { IBook } from "../components/Book/interfaces";

interface IResponse {
  data?: IBook[];
  error?: string;
  success: boolean;
}

interface ICreateBook {
  title: string;
  author: string;
  category: string;
  isbn: string;
  stock: number;
}

interface IUpdateBook {
  title: string;
  author: string;
  category: string;
  stock: number;
}

interface IService {
  getAll: () => Promise<IResponse>;
  create: (newBook: ICreateBook) => Promise<IResponse>;
  update: (_id: string, updateBook: IUpdateBook) => Promise<IResponse>;
  delete: (_id: string) => Promise<IResponse>;
}

export const bookService: IService = {
  getAll: () => api.get("/books"),
  create: (newBook: ICreateBook) => api.post("/books", newBook),
  update: (_id: string, updateBook: IUpdateBook) => api.put(`/books/${_id}`, updateBook),
  delete: (_id: string) => api.delete(`/books/${_id}`),
};
