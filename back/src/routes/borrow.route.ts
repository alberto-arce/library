import express from "express";

import { getBorrows, createBorrow } from "../controllers";

const router = express.Router();

router.get("/borrows", getBorrows);
router.post("/borrows", createBorrow);

export { router };
