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
}

interface IService {
  getBorrows: () => Promise<IResponse>;
  createBorrow: (newBorrow: ICreateBorrow) => Promise<IResponse>;
}

export const borrowService: IService = {
  getBorrows: () => api.get("/borrows"),
  createBorrow: (newBorrow) => api.post("/borrows", newBorrow),
};
