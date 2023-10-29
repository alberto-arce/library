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
  isbn: string;
  stock: number;
}

interface IService {
  getBooks: () => Promise<IResponse>;
  createBook: (newBook: ICreateBook) => Promise<IResponse>;
  deleteBook: (_id: string) => Promise<IResponse>;
}

export const bookService: IService = {
  getBooks: () => api.get("/books"),
  createBook: (newBook: ICreateBook) => api.post("/books", newBook),
  deleteBook: (_id: string) => api.delete(`/books/${_id}`),
};
