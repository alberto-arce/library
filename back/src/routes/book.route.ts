import express from "express";

import {
  getBooks,
  getBookById,
  createBook,
  deleteBook,
} from "../controllers";

const router = express.Router();

router.get("/books", getBooks);
router.get("/books/:id", getBookById);
router.post("/books", createBook);
router.delete("/books/:id", deleteBook);

export { router };
