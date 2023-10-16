import { Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { authRepository } from "../repositories";
import { User } from "../models";

class AuthService {
  async login(req: Request) {
    const { name, password } = req.body;
    const user: User | null = await authRepository.getUser(name);
    if (!user) {
      return {
        statusCode: 401,
        data: {
          error: "User not found",
          success: false,
        },
      };
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return {
        statusCode: 401,
        data: {
          error: "Invalid password",
          success: false,
        },
      };
    }
    const token = jwt.sign({ name: user.name }, "SECRET_KEY", {
      expiresIn: "1h",
    });
    return {
      statusCode: 200,
      data: {
        user: { name: user.name },
        token,
        success: true,
      },
    };
  }
}
export const authService = new AuthService();
