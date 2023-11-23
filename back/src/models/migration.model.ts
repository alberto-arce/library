import mongoose from "mongoose";

import { MONGODB_URI } from "../common";
import { UserModel } from "./user.model";
import { BookModel } from "./book.model";
import { MemberModel } from "./member.model";

export class Migration {
  static async getUserModel() {
    await mongoose.connect(MONGODB_URI);
    return {
      UserModel,
    };
  }
  
  static async getMemberModel() {
    await mongoose.connect(MONGODB_URI);
    return {
      MemberModel,
    };
  }
  
  static async getBookModel() {
    await mongoose.connect(MONGODB_URI);
    return {
      BookModel,
    };
  }
}
