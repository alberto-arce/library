import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { authService } from "../services";
import { logger } from "../logs";

export const login = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
    const user: any = await authService.getUser(name);
    if (!user) {
      res.status(401).json({ error: "User not found" });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ error: "Invalid password" });
      } else {
        const token = jwt.sign({ name: user.name }, 'SECRET_KEY', { expiresIn: '1h' });
        res.status(200).json({ user: { name: user.name }, token });
      }
    }
  } catch (error) {
    logger.error(`auth controller - login\n ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
