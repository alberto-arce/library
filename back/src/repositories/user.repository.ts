import { IUser } from "../interfaces";
import { UserModel } from "../models";

class UserRepository {
  async getAll() {
    return UserModel.find().exec();
  }

  async getOne(id: string) {
    return UserModel.findById(id).exec();
  }

  async create(user: IUser) {
    return UserModel.create(user);
  }

  async update(id: string, updateUser: any) {
    return UserModel.findByIdAndUpdate(id, updateUser, {
      new: true,
    }).exec();
  }

  async delete(id: string): Promise<IUser | null> {
    return UserModel.findByIdAndRemove(id).exec();
  }
}
export const userRepository = new UserRepository();
