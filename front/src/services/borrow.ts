import { api } from "./api";

interface IBorrow {
  _id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  member: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  book: any;
}

interface IResponse {
  data?: IBorrow[];
  error?: string;
  success: boolean;
}

interface IService {
  getBorrows: () => Promise<IResponse>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createBorrow: (newBorrow: any) => Promise<IResponse>;
}

export const borrowService: IService = {
  getBorrows: () => api.get("/borrows"),
  createBorrow: (newBorrow) => api.post("/borrows", newBorrow),
};
