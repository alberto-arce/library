import bcrypt from "bcrypt";

import { Migration } from "../models";

export async function up(): Promise<void> {
  const { UserModel } = await Migration.getUserModel();
  await UserModel.create({
    name: "admin",
    password: await bcrypt.hash("admin", 10),
    role: "admin",
  });
}
