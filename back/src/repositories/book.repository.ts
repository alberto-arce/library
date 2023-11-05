import { IBook } from "../interfaces";
import { BookModel } from "../models";

class BookRepository {
  async getBooks() {
    return BookModel.find().exec();
  }

  async getBookById(id: string) {
    return BookModel.findById(id).exec();
  }

  async createBook(book: IBook) {
    return BookModel.create(book);
  }

  async updateBook(id: string, updatedBook: any) {
    return BookModel.findByIdAndUpdate(id, updatedBook, {
      new: true,
    }).exec();
  }

  async deleteBook(id: string): Promise<IBook | null> {
    return BookModel.findByIdAndRemove(id).exec();
  }
}
export const bookRepository = new BookRepository();
