import express from "express";

import { getBorrows, createBorrow, deleteBorrow } from "../controllers";

const router = express.Router();

router.get("/borrows", getBorrows);
router.post("/borrows", createBorrow);
router.delete("/borrows/:id", deleteBorrow);

export { router };
