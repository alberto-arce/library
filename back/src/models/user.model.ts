import { prop, getModelForClass } from '@typegoose/typegoose';

export class User { 
  @prop({ required: true })
  name!: string;
  
  @prop({ required: true })
  password!: string;
  
  @prop({ required: true })
  role!: string;
  
  @prop({ default: Date.now })
  createdAt?: Date;

  @prop({ default: Date.now })
  updatedAt?: Date;
}
export const UserModel = getModelForClass(User);
