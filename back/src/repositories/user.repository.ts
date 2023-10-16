import { IUser } from "../interfaces";
import { UserModel } from "../models";

class UserRepository {
  async getUsers() {
    return UserModel.find().exec();
  }

  async getUserById(id: string) {
    return UserModel.findById(id).exec();
  }

  async createUser(user: IUser) {
    return UserModel.create(user);
  }

  async deleteUser(id: string): Promise<IUser | null> {
    return UserModel.findByIdAndRemove(id).exec();
  }
}
export const userRepository = new UserRepository();
