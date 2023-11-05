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
  getBooks: () => Promise<IResponse>;
  createBook: (newBook: ICreateBook) => Promise<IResponse>;
  updateBook: (_id: string, updateBook: IUpdateBook) => Promise<IResponse>;
  deleteBook: (_id: string) => Promise<IResponse>;
}

export const bookService: IService = {
  getBooks: () => api.get("/books"),
  createBook: (newBook: ICreateBook) => api.post("/books", newBook),
  updateBook: (_id: string, updateBook: IUpdateBook) => api.put(`/books/${_id}`, updateBook),
  deleteBook: (_id: string) => api.delete(`/books/${_id}`),
};
