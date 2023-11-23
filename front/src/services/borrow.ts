import { api } from "./api";
import { IBorrowResponse } from "./interface";

interface ICreateBorrow {
  memberId: string;
  bookId: string | undefined;
  numberSelectedBooks: number;
  newStock: number;
}

interface IService {
  getAll: () => Promise<IBorrowResponse>;
  create: (newBorrow: ICreateBorrow) => Promise<IBorrowResponse>;
  delete: (_id: string, stock: number) => Promise<IBorrowResponse>;
}

export const borrowService: IService = {
  getAll: () => api.get("/borrows"),
  create: (newBorrow) => api.post("/borrows", newBorrow),
  delete: (_id: string, stock: number) =>
    api.delete(`/borrows/${_id}`, { data: { stock } }),
};
