
export interface IMember {
  _id: string;
  name: string;
}

interface IBook {
  _id: string; 
  title: string;
  author: string;
  isbn: string;
  borrowed: boolean;
  borrowedDate?: string;
}

export interface BorrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBook: IBook | null;
}
