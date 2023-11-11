import { Request, Response } from "express";

import { borrowService } from "../services";
import { logger } from "../logs";

export const getBorrows = async (_: Request, res: Response) => {
  try {
    const { statusCode, data } = await borrowService.getAll();
    res.status(statusCode).json(data);
  } catch (error) {
    logger.error(`borrow controller - getBorrows\n ${error}`);
    res.status(500).json({ success: false, data: "Internal Server Error" });
  }
};

export const createBorrow = async (req: Request, res: Response) => {
  try {
    const { statusCode, data } = await borrowService.create(req);
    res.status(statusCode).json(data);
  } catch (error) {
    logger.error(`borrow controller - createBorrow\n ${error}`);
    res.status(500).json({ success: false, data: "Internal Server Error" });
  }
};

export const deleteBorrow = async (req: Request, res: Response) => {
  try {
    const { statusCode, data } = await borrowService.delete(req);
    res.status(statusCode).json(data);
  } catch (error) {
    logger.error(`borrow controller - deleteBorrow\n ${error}`);
    res.status(500).json({ success: false, data: "Internal Server Error" });
  }
};
