import mongoose from "mongoose";
import { Request } from "express";
import bcrypt from "bcrypt";

import { userRepository } from "../repositories";

class UserService {
  async getUsers() {
    const users = await userRepository.getUsers();
    if (!users.length) {
      return this.createResponse(404, { error: "Users not found" }, false);
    }
    return this.createResponse(200, { data: users }, true);
  }

  async getUserById(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return this.createResponse(400, { error: "Invalid ID" }, false);
    }
    const user = await userRepository.getUserById(id);
    if (!user) {
      return this.createResponse(404, { error: "User not found" }, false);
    }
    return this.createResponse(200, { data: user }, true);
  }

  async createUser(req: Request) {
    const { name, password, role } = req.body;
    const newUser = {
      name,
      password: await bcrypt.hash(password, 10),
      role: role ?? "employee",
    };
    const createdUser = await userRepository.createUser(newUser);
    if (!createdUser) {
      return this.createResponse(500, { error: "User was not created" }, false);
    }
    return this.createResponse(201, { data: createdUser }, true);
  }

  async updateUser(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return this.createResponse(400, { error: "Invalid ID" }, false);
    }
    const { name } = req.body;
    const updatedUser = await userRepository.updateUser(id, {
      name,
    });
    if (!updatedUser) {
      return this.createResponse(500, { error: "User was not updated" }, false);
    }
    return this.createResponse(200, { data: updatedUser }, true);
  }

  async deleteUser(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return this.createResponse(400, { error: "Invalid ID" }, false);
    }
    const deletedUser = await userRepository.deleteUser(id);
    if (!deletedUser) {
      return this.createResponse(500, { error: "User was not deleted" }, false);
    }
    return this.createResponse(200, { data: deletedUser }, true);
  }

  private createResponse(statusCode: number, data: any, success: boolean) {
    return {
      statusCode,
      data: {
        ...data,
        success,
      },
    };
  }
}
export const userService = new UserService();
