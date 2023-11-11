import { Request, Response } from "express";

import { memberService } from "../services";
import { logger } from "../logs";

export const getMembers = async (_: Request, res: Response) => {
  try {
    const { statusCode, data } = await memberService.getAll();
    res.status(statusCode).json(data);
  } catch (error) {
    logger.error(`member controller - getMember\n ${error}`);
    res.status(500).json({ success: false, data: "Internal Server Error" });
  }
};

export const createMember = async (req: Request, res: Response) => {
  try {
    const { statusCode, data } = await memberService.create(req);
    res.status(statusCode).json(data);
  } catch (error) {
    logger.error(`member controller - createMember\n ${error}`);
    res.status(500).json({ success: false, data: "Internal Server Error" });
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const { statusCode, data } = await memberService.update(req);
    res.status(statusCode).json(data);
  } catch (error) {
    logger.error(`member controller - updateMember\n ${error}`);
    res.status(500).json({ success: false, data: "Internal Server Error" });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const { statusCode, data } = await memberService.delete(req);
    res.status(statusCode).json(data);
  } catch (error) {
    logger.error(`member controller - deleteMember\n ${error}`);
    res.status(500).json({ success: false, data: "Internal Server Error" });
  }
};

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const { statusCode, data } = await memberService.changeStatus(req);
    res.status(statusCode).json(data);
  } catch (error) {
    logger.error(`member controller - deleteMember\n ${error}`);
    res.status(500).json({ success: false, data: "Internal Server Error" });
  }
};
