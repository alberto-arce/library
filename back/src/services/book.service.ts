import mongoose from "mongoose";
import { Request } from "express";

import { bookRepository } from "../repositories";
class BookService {
  async getBooks() {
    const books = await bookRepository.getBooks();
    if (!books.length) {
      return this.createResponse(404, { error: "Books not found" }, false);
    }
    return this.createResponse(200, { data: books }, true);
  }

  async getBookById(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return this.createResponse(400, { error: "Invalid ID" }, false);
    }
    const book = await bookRepository.getBookById(id);
    if (!book) {
      return this.createResponse(404, { error: "Book not found" }, false);
    }
    return this.createResponse(200, { data: book }, true);
  }

  async createBook(req: Request) {
    const { title, author, category, isbn, stock } = req.body;
    const newBook = {
      title,
      author,
      category,
      isbn,
      stock,
    };
    const createdBook = await bookRepository.createBook(newBook);
    if (!createdBook) {
      return this.createResponse(500, { error: "Book was not created" }, false);
    }
    return this.createResponse(201, { data: createdBook }, true);
  }

  async updateBook(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return this.createResponse(400, { error: "Invalid ID" }, false);
    }
    const updatedBook = await bookRepository.updateBook(id, { ...req.body });
    if (!updatedBook) {
      return this.createResponse(500, { error: "Book was not updated" }, false);
    }
    return this.createResponse(200, updatedBook, true);
  }

  async deleteBook(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return this.createResponse(400, { error: "Invalid ID" }, false);
    }
    const deletedBook = await bookRepository.deleteBook(id);
    if (!deletedBook) {
      return this.createResponse(404, { error: "Book not found" }, false);
    }
    return this.createResponse(200, { data: deletedBook }, true);
  }

  private createResponse(statusCode: number, data: any, success: boolean) {
    return {
      statusCode,
      data: {
        ...data,
        success,
      },
    };
  }
}
export const bookService = new BookService();
