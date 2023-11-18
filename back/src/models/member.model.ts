import { prop, getModelForClass } from '@typegoose/typegoose';

export class Member {
  @prop({ required: true, type: String })
  name!: string;

  @prop({ default: 'activado', type: String})
  status!: string;

  @prop({ default: Date.now, type: Date})
  createdAt?: Date;
  
  @prop({ default: null, type: () => Date })
  borrowedAt?: Date | null;

  @prop({ default: null, type: () => Date })
  deletedAt?: string | null;
}
export const MemberModel = getModelForClass(Member);
