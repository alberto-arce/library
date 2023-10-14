import { UserModel } from "../models";

class AuthService {
  async getUser(name: string) {
    return UserModel.findOne({ name }).exec();
  }
}
export const authService = new AuthService();
