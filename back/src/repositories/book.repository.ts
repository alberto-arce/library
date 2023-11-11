import { IBook } from "../interfaces";
import { BookModel } from "../models";

class BookRepository {
  async getAll() {
    return BookModel.find().exec();
  }

  async getOne(id: string) {
    return BookModel.findById(id).exec();
  }

  async create(book: IBook) {
    return BookModel.create(book);
  }

  async update(id: string, updateBook: any) {
    return BookModel.findByIdAndUpdate(id, updateBook, {
      new: true,
    }).exec();
  }

  async delete(id: string): Promise<IBook | null> {
    return BookModel.findByIdAndRemove(id).exec();
  }
}
export const bookRepository = new BookRepository();
