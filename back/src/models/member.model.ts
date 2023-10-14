import { prop, getModelForClass } from '@typegoose/typegoose';

export class Member {
  @prop({ required: true })
  name!: string;

  @prop({ default: Date.now })
  createdAt?: Date;

  @prop({ default: Date.now })
  updatedAt?: Date;
}
export const MemberModel = getModelForClass(Member);
