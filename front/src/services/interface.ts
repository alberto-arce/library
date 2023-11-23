import { IMember } from "../components/BorrowModal/interfaces";
import { IBook } from "../components/Book/interfaces";
import { IBorrow } from "./../components/Borrow/interfaces";
import { IUser } from "../components/User/interfaces";

export interface IResponse<T> {
  data?: T[];
  error?: string;
  success: boolean;
  status: number;
}

export interface ILoginResponse {
  user?: {
    name: string;
    role: string;
  };
  token?: string;
  error?: string;
  success: boolean;
}

export interface IMemberResponse extends IResponse<IMember> {}
export interface IBookResponse extends IResponse<IBook> {}
export interface IBorrowResponse extends IResponse<IBorrow> {}
export interface IUserResponse extends IResponse<IUser> {}
