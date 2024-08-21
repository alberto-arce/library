import mongoose from "mongoose";
import { Request } from "express";
import bcrypt from "bcrypt";

import { userRepository } from "../repositories";

class UserService {
  async getAll() {
    const users = await userRepository.getAll();
    if (!users.length) {
      return this.createResponse(404, { error: "Users not found" }, false);
    }
    return this.createResponse(200, { data: users }, true);
  }

  async getOne(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return this.createResponse(400, { error: "Invalid ID" }, false);
    }
    const user = await userRepository.getOne(id);
    if (!user) {
      return this.createResponse(404, { error: "User not found" }, false);
    }
    return this.createResponse(200, { data: user }, true);
  }

  async create(req: Request) {
    const { name, lastname, password, role } = req.body;
    const createdUser = await userRepository.create({
      name,
      lastname,
      password: await bcrypt.hash(password, 10),
      role: role ?? "employee",
    });
    if (!createdUser) {
      return this.createResponse(500, { error: "User was not created" }, false);
    }
    return this.createResponse(201, { data: createdUser }, true);
  }

  async update(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return this.createResponse(400, { error: "Invalid ID" }, false);
    }
    const updatedUser = await userRepository.update(id, {
      ...req.body,
    });
    if (!updatedUser) {
      return this.createResponse(500, { error: "User was not updated" }, false);
    }
    return this.createResponse(200, { data: updatedUser }, true);
  }

  async delete(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return this.createResponse(400, { error: "Invalid ID" }, false);
    }
    const deletedUser = await userRepository.delete(id);
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
