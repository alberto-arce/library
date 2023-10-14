import mongoose from "mongoose";
import { IBook } from "../interfaces";
import { BookModel } from "../models";

class BookService {
  async getBooks() {
    return BookModel.find().exec();
  }

  async getBookById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
      return BookModel.findById(id).exec();
  }

  async createBook(book: IBook) {
    return BookModel.create(book);
  }

  async deleteBook(id: string): Promise<IBook | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    const deletedBook = await BookModel.findByIdAndRemove(id).exec();
    if (!deletedBook) {
      throw new Error("Book not found");
    }
    return deletedBook;
  }
}
export const bookService = new BookService();
