export interface IBook {
    _id: string; 
    title: string;
    author: string;
    isbn: string;
    borrowed: boolean;
    borrowedDate?: string;
  }
  