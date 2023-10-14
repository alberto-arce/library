import { Request, Response } from "express";

import { bookService, borrowService, userService } from "../services";
import { logger } from "../logs";
import { BorrowModel } from "../models";

export const getBorrows = async (_: Request, res: Response) => {
  try {
    const borrows = await borrowService.getBorrows();
    res.status(200).json(borrows);
  } catch (error) {
    logger.error(`borrow controller - getBorrows\n ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createBorrow = async (req: Request, res: Response) => {
  const { userId, bookId } = req.body;
  let borrow = null;
  try {
    const user = await userService.getUserById(userId);
    const book = await bookService.getBookById(bookId);
    if (!user || !book) {
      res.status(400).json({ message: "User or book not found" });
    } else {
      borrow = new BorrowModel({
        user: user._id,
        book: book._id,
      });
      const borrows = await borrowService.createBorrow(borrow);
      res.status(200).json(borrows);
    }
  } catch (error) {
    logger.error(`borrow controller - getBorrows\n ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
