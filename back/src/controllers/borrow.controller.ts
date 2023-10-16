import { Request, Response } from "express";

import { borrowService } from "../services";
import { logger } from "../logs";

export const getBorrows = async (_: Request, res: Response) => {
  try {
    const { statusCode, data } = await borrowService.getBorrows();
    res.status(statusCode).json(data);
  } catch (error) {
    logger.error(`borrow controller - getBorrows\n ${error}`);
    res.status(500).json({ success: false, data: "Internal Server Error" });
  }
};

export const createBorrow = async (req: Request, res: Response) => {
  try {
    const { statusCode, data } = await borrowService.createBorrow(req);
    res.status(statusCode).json(data);
  } catch (error) {
    logger.error(`borrow controller - getBorrows\n ${error}`);
    res.status(500).json({ success: false, data: "Internal Server Error" });
  }
};
