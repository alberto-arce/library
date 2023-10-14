import { Request, Response } from "express";
import bcrypt from 'bcrypt';

import { userService } from "../services";
import { logger } from "../logs";

export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    logger.error(`user controller - getUsers\n ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      logger.warn("user controller - getUserById\n User not found");
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    logger.error(`user controller - getUserById\n ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, password, role } = req.body;
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = {
      name,
      password: hashedPassword,
      role: role ?? "employee"
    };
    const createdUser = await userService.createUser(newUser);
    res.status(201).json({ ok: true, createdUser });
  } catch (error) {
    logger.error(`user controller - createUser\n ${error}`);
    res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedUser = await userService.deleteUser(id);
    if (!deletedUser) {
      logger.warn("user controller - deleteUser\n User not found");
      res.status(404).json({ ok: false, error: "User not found" });
      return;
    }
    res.status(200).json({ ok: true, message: "User deleted successfully" });
  } catch (error) {
    logger.error(`user controller - deleteUser\n ${error}`);
    res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
};
