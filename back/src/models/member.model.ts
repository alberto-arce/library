import { prop, getModelForClass } from '@typegoose/typegoose';

export class Member {
  @prop({ required: true, type: String })
  name!: string;

  @prop({ default: 'active', type: String})
  status!: string;

  @prop({ default: Date.now, type: String})
  createdAt?: Date;

  @prop({ default: null, type: () => Date })
  deletedAt?: Date | null;
}
export const MemberModel = getModelForClass(Member);
