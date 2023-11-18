import { Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { authRepository } from "../repositories";
import { User } from "../models";

class AuthService {
  async login(req: Request) {
    const { name, password } = req.body;
    const user: User | null = await authRepository.getUser(name);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return {
        statusCode: 401,
        data: {
          // user: { name: "", role: "" },
          // token: '',
          error: "Usuario y/o contraseña inválidas",
          success: false,
        },
      };
    }
    return {
      statusCode: 200,
      data: {
        user: { name: user.name, role: user.role },
        token: jwt.sign({ name: user.name, role: user.role }, "SECRET_KEY"),
        success: true,
      },
    };
  }
}
export const authService = new AuthService();
