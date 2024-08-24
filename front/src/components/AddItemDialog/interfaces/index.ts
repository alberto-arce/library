import { IUser } from "../../User/interfaces";
import { IMember } from "../../Member/interfaces";
import { IBook } from "../../Book/interfaces";
import { IBorrow } from "../../Borrow/interfaces";

export interface IAddItemProps {
    open: boolean;
    onClose: () => void;
    onSave: (item: IUser | IMember | IBook | IBorrow) => void;
    title: string;
    fields: { label: string; value: string }[];
  }
  