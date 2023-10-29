import { prop, getModelForClass } from "@typegoose/typegoose";

export class User {
  @prop({ required: true, type: String })
  name!: string;

  @prop({ required: true, type: String })
  password!: string;

  @prop({ required: true, type: String })
  role!: string;

  @prop({ default: Date.now, type: Date })
  createdAt?: Date;

  @prop({ default: null, type: () => Date })
  deletedAt?: Date | null;
}
export const UserModel = getModelForClass(User);
