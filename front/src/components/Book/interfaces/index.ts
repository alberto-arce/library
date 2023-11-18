export interface IBook {
  _id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  stock: number;
  externalBorrow: string;
  createdAt: Date;
  updatedAt: Date;
}
