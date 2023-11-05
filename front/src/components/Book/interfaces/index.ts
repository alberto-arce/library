export interface IBook {
  _id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
