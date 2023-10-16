import mongoose from "mongoose";
import { bookRepository } from "../repositories";
import { Request } from "express";

class BookService {
  async getBooks() {
    const books = await bookRepository.getBooks();
    if (!books) {
      return {
        statusCode: 500,
        data: {
          error: "Error getting books",
          success: false,
        },
      };
    }
    return {
      statusCode: 200,
      data: {
        data: books,
        success: true,
      },
    };
  }

  async getBookById(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        statusCode: 400,
        data: {
          data: [],
          error: "Invalid ID",
          success: false,
        },
      };
    }
    const book = await bookRepository.getBookById(id);
    if (!book) {
      return {
        statusCode: 404,
        data: {
          error: "Book not found",
          success: false,
        },
      };
    }
    return {
      statusCode: 200,
      data: {
        data: book,
        success: true,
      },
    };
  }

  async createBook(req: Request) {
    const { title, author, isbn, stock } = req.body;
    const newBook = {
      title,
      author,
      isbn,
      stock,
    };
    const createdBook = await bookRepository.createBook(newBook);
    if (!createdBook) {
      return {
        statusCode: 500,
        data: {
          error: "Book was not create",
          success: false,
        },
      };
    }
    return {
      statusCode: 201,
      data: {
        data: createdBook,
        success: true,
      },
    };
  }

  async deleteBook(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        statusCode: 404,
        data: {
          error: "Invalid ID",
          success: false,
        },
      };
    }
    const deletedBook = await bookRepository.deleteBook(id);
    if (!deletedBook) {
      return {
        statusCode: 404,
        data: {
          error: "Book not found",
          success: false,
        },
      };
    }
    return {
      statusCode: 200,
      data: {
        data: deletedBook,
        success: true,
      },
    };
  }
}
export const bookService = new BookService();
