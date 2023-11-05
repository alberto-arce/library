
export interface IMember {
  _id: string;
  name: string;
  status: string;
}

interface IBook {
  _id: string; 
  title: string;
  author: string;
  isbn: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BorrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBook: IBook | null;
}
