import { Request, Response } from "express";

import { bookService } from "../services";
import { logger } from "../logs";

export const getBooks = async (_: Request, res: Response) => {
  try {
    const { statusCode, data } = await bookService.getBooks();
    res.status(statusCode).json(data);
  } catch (error) {
    logger.error(`book controller - getBooks\n ${error}`);
    res.status(500).json({ success: false, data: "Internal Server Error" });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const { statusCode, data } = await bookService.getBookById(req);
    res.status(statusCode).json(data);
  } catch (error) {
    logger.error(`book controller - geBookById\n ${error}`);
    res.status(500).json({ success: false, data: "Internal Server Error" });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { statusCode, data } = await bookService.createBook(req);
    res.status(statusCode).json(data);
  } catch (error) {
    logger.error(`book controller - createBook\n ${error}`);
    res.status(500).json({ success: false, data: "Internal Server Error" });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { statusCode, data } = await bookService.deleteBook(req);
    res.status(statusCode).json(data);
  } catch (error) {
    logger.error(`book controller - deleteBook\n ${error}`);
    res.status(500).json({ success: false, data: "Internal Server Error" });
  }
};
