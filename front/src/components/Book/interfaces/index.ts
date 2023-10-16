export interface IBook {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  stock: number;
  borrowed: boolean;
  borrowedDate?: string;
}
