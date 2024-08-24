import { User, UserModel } from "../models";

class UserRepository {
  async getAll() {
    return UserModel.find().exec();
  }

  async getOne(id: string) {
    return UserModel.findById(id).exec();
  }

  async create(user: User) {
    return UserModel.create(user);
  }

  async update(id: string, updateUser: Partial<User>) {
    return UserModel.findByIdAndUpdate(id, updateUser, {
      new: true,
    }).exec();
  }

  async delete(id: string): Promise<Partial<User> | null> {
    return UserModel.findByIdAndRemove(id).exec();
  }
}
export const userRepository = new UserRepository();
