import { api } from "./api";
import { IBookResponse } from "./interface";

interface ICreateBook {
  title: string;
  author: string;
  category: string;
  isbn: string;
  stock: number;
  externalBorrow: string;
}

interface IUpdateBook {
  title: string;
  author: string;
  category: string;
  stock: number;
}

interface IService {
  getAll: () => Promise<IBookResponse>;
  create: (newBook: ICreateBook) => Promise<IBookResponse>;
  update: (_id: string, updateBook: IUpdateBook) => Promise<IBookResponse>;
  delete: (_id: string) => Promise<IBookResponse>;
}

export const bookService: IService = {
  getAll: () => api.get("/books"),
  create: (newBook: ICreateBook) => api.post("/books", newBook),
  update: (_id: string, updateBook: IUpdateBook) =>
    api.put(`/books/${_id}`, updateBook),
  delete: (_id: string) => api.delete(`/books/${_id}`),
};
