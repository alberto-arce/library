
export interface IMember {
  _id: string;
  dni: number;
  name: string;
  lastname: string;
  status: string;
}

interface IBook {
  _id: string; 
  title: string;
  author: string;
  isbn: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BorrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBook: IBook | null;
  onBookBorrowed: () => void;
}
