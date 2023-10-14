import { Request, Response } from "express";

import { bookService } from "../services";
import { logger } from "../logs";

export const getBooks = async (_: Request, res: Response) => {
  try {
    const books = await bookService.getBooks();
    res.status(200).json(books);
  } catch (error) {
    logger.error(`book controller - getBooks\n ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await bookService.getBookById(id);
    if (!book) {
      logger.error("book controller - getBookById\n Book not found");
      res.status(404).json({ ok: false, message: "Book not found" });
      return;
    }
    res.status(200).json(book);
  } catch (error) {
    logger.error(`book controller - geBookById\n ${error}`);
    res.status(500).json({ ok: true, message: "Internal Server Error" });
  }
};

export const createBook = async (req: Request, res: Response) => {
  const { title, author, isbn } = req.body;
  try {
    const newBook = {
      title,
      author,
      isbn,
    };
    const createdBook = await bookService.createBook(newBook);
    res.status(201).json({ ok: true, createdBook });
  } catch (error) {
    logger.error(`book controller - createBook\n ${error}`);
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedUser = await bookService.deleteBook(id);
    if (!deletedUser) {
      logger.error("book controller - deleteBook\n Book not found");
      res.status(404).json({ ok: false, error: "Book not found" });
    }
    res.status(200).json({ ok: true, message: "Book deleted successfully" });
  } catch (error) {
    logger.error(`book controller - deleteBook\n ${error}`);
    res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
};
