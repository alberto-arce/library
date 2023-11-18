export interface IBorrow {
  _id: string;
  member: IMember;
  book: IBook;
  stock: number;
  createdAt: Date;
  deletedAt: Date | null;
}

interface IMember {
  _id: string;
  name: string;
  status: string;
}

interface IBook {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  stock: number;
  externalBorrow: string;
  createdAt: Date;
  updatedAt: Date;
}
