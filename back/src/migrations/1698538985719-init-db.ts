import bcrypt from "bcrypt";

import { Migration } from "../models";

export async function up(): Promise<void> {
  const { UserModel } = await Migration.getUserModel();
  const { MemberModel } = await Migration.getMemberModel();
  const { BookModel } = await Migration.getBookModel();
  await UserModel.create([
    {
      name: "admin",
      lastname: "admin",
      password: await bcrypt.hash("admin", 10),
      role: "admin",
    },
    {
      name: "emp",
      lastname: "emp",
      password: await bcrypt.hash("emp", 10),
      role: "employee",
    },
  ]);
  await MemberModel.create([
    {
      dni: 12345678,
      name: "Pedro",
      lastname: "Gonzalez",
    },
  ]);
  await BookModel.create([
    {
      title: "Learning Typescript",
      author: "Josh Goldberg",
      category: "Programming",
      isbn: "123-1",
      stock: 10,
      externalBorrow: "si"
    },
  ]);
}
