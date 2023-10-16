import mongoose from "mongoose";
import { Request } from "express";
import bcrypt from "bcrypt";

import { userRepository } from "../repositories";

class UserService {
  async getUsers() {
    const users = await userRepository.getUsers();
    if (!users) {
      return {
        statusCode: 500,
        data: {
          error: "Users not found",
          success: false,
        },
      };
    }
    return {
      statusCode: 200,
      data: {
        data: users,
        success: true,
      },
    };
  }

  async getUserById(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        statusCode: 400,
        data: {
          error: "Invalid ID",
          success: false,
        },
      };
    }
    const user = await userRepository.getUserById(id);
    if (!user) {
      return {
        statusCode: 500,
        data: {
          error: "User not found",
          success: false,
        },
      };
    }
    return {
      statusCode: 200,
      data: {
        data: user,
        success: true,
      },
    };
  }

  async createUser(req: Request) {
    const { name, password, role } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = {
      name,
      password: hashedPassword,
      role: role ?? "employee",
    };
    const createdUser = await userRepository.createUser(newUser);
    if (!createdUser) {
      return {
        statusCode: 500,
        data: {
          error: "User was not create",
          success: false,
        },
      };
    }
    return {
      statusCode: 201,
      data: {
        data: createdUser,
        success: true,
      },
    };
  }

  async deleteUser(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        statusCode: 404,
        data: {
          error: "Invalid ID",
          success: false,
        },
      };
    }
    const deletedUser = await userRepository.deleteUser(id);
    if (!deletedUser) {
      return {
        statusCode: 500,
        data: {
          error: "User was not delete",
          success: false,
        },
      };
    }
    return {
      statusCode: 200,
      data: {
        data: deletedUser,
        success: true,
      },
    };
  }
}
export const userService = new UserService();
