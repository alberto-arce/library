import { UserModel } from "../models";

class AuthRepository {
  async getUser(name: string) {
    return UserModel.findOne({ name }).exec();
  }
}
export const authRepository = new AuthRepository();
