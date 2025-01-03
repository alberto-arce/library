import { Book, BookModel } from "../models";

class BookRepository {
  async getAll() {
    return BookModel.find().exec();
  }

  async getOne(id: string) {
    return BookModel.findById(id).exec();
  }

  async create(book: Partial<Book>) {
    return BookModel.create(book);
  }

  async update(id: string, updateBook: Partial<Book>) {
    return BookModel.findByIdAndUpdate(id, updateBook, {
      new: true,
    }).exec();
  }

  async delete(id: string): Promise<Book | null> {
    return BookModel.findByIdAndDelete(id).exec();
  }
}
export const bookRepository = new BookRepository();
