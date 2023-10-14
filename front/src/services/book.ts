import { api } from "./api";

interface IBook {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  borrowed: boolean;
  borrowedDate?: string;
}

interface IDeleteResponse {
  message: string;
  ok: boolean;
}

interface ICreateBook {
  title: string;
  author: string;
  isbn: string;
}

interface IService {
  getBooks: () => Promise<IBook[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createBook: (newBook: ICreateBook) => Promise<any>;
  deleteBook: (_id: string) => Promise<IDeleteResponse>;
}

export const bookService: IService = {
  getBooks: () => api.get("/books"),
  createBook: (newBook: ICreateBook) => api.post("/books", newBook),
  deleteBook: (_id: string) => api.delete(`/books/${_id}`),
};
