import mongoose from "mongoose";
import { IUser } from "../interfaces";
import { UserModel } from "../models";

class UserService {
  async getUsers() {
    return UserModel.find().exec();
  }

  async getUserById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return UserModel.findById(id).exec();
  }

  async createUser(user: IUser) {
    return UserModel.create(user);
  }

  async deleteUser(id: string): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    const deletedUser = await UserModel.findByIdAndRemove(id).exec();
    if (!deletedUser) {
      throw new Error("User not found");
    }
    return deletedUser;
  }
}
export const userService = new UserService();
