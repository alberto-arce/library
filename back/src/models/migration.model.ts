import mongoose from "mongoose";

import { UserModel } from "./user.model";
import { MONGODB_URI } from "../common";

export class Migration {
  static async getUserModel() {
    await mongoose.connect(MONGODB_URI);
    return {
      UserModel,
    };
  }
}
