import { Request, Response } from "express";

import { userService } from "../services";
import { logger } from "../logs";

export const getUsers = async (_: Request, res: Response) => {
  try {
    const { statusCode, data } = await userService.getAll();
    res.status(statusCode).json(data);
  } catch (error) {
    logger.error(`user controller - getUsers\n ${error}`);
    res.status(500).json({ success: false, data: "Internal Server Error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { statusCode, data } = await userService.getOne(req);
    res.status(statusCode).json(data);
  } catch (error) {
    logger.error(`user controller - getUserById\n ${error}`);
    res.status(500).json({ data: "Internal Server Error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { statusCode, data } = await userService.create(req);
    res.status(statusCode).json(data);
  } catch (error) {
    logger.error(`user controller - createUser\n ${error}`);
    res.status(500).json({ success: false, data: "Internal Server Error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { statusCode, data } = await userService.update(req);
    res.status(statusCode).json(data);
  } catch (error) {
    logger.error(`user controller - updateUser\n ${error}`);
    res.status(500).json({ success: false, data: "Internal Server Error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { statusCode, data } = await userService.delete(req);
    res.status(statusCode).json(data);
  } catch (error) {
    logger.error(`user controller - deleteUser\n ${error}`);
    res.status(500).json({ success: false, data: "Internal Server Error" });
  }
};
