import { Request, Response } from "express";

import { memberService } from "../services";
import { logger } from "../logs";

export const getMembers = async (_: Request, res: Response) => {
  try {
    const members = await memberService.getMembers();
    res.status(200).json(members);
  } catch (error) {
    logger.error(`member controller - getMember\n ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createMember = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newMember = {
      name
    };
    const createdMember = await memberService.createMember(newMember);
    res.status(201).json({ ok: true, createdMember });
  } catch (error) {
    logger.error(`member controller - createMember\n ${error}`);
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedMember = await memberService.deleteMember(id);
    if (!deletedMember) {
      logger.error("member controller - deleteMember\n Member not found");
      res.status(404).json({ ok: false, error: "Member not found" });
    }
    res.status(200).json({ ok: true, message: "Member deleted successfully" });
  } catch (error) {
    logger.error(`member controller - deleteMember\n ${error}`);
    res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
};
