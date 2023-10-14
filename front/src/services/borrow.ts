import { api } from "./api";

interface IBorrow {
  _id: string;
  user: string;
  book: string;
  isBorrow: string;
}

interface IService {
  getBorrows: () => Promise<IBorrow[]>;
}

export const borrowService: IService = {
  getBorrows: () => api.get("/borrows"),
};
