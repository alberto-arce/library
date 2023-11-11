import { api } from "./api";

import { IBorrow } from "./../components/Borrow/interfaces";

interface IResponse {
  data?: IBorrow[];
  error?: string;
  success: boolean;
}

interface ICreateBorrow {
  memberId: string;
  bookId: string | undefined;
  numberSelectedBooks: number;
  newStock: number;
}

interface IService {
  getAll: () => Promise<IResponse>;
  create: (newBorrow: ICreateBorrow) => Promise<IResponse>;
  delete: (_id: string, stock: number) => Promise<IResponse>;
}

export const borrowService: IService = {
  getAll: () => api.get("/borrows"),
  create: (newBorrow) => api.post("/borrows", newBorrow),
  delete: (_id: string, stock: number) =>
    api.delete(`/borrows/${_id}`, { data: { stock } }),
};
