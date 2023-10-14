import { prop, Ref, getModelForClass } from '@typegoose/typegoose';

import { User } from './user.model';
import { Book } from './book.model';

export class Role{
  @prop({ ref: () => User, required: true })
  user!: Ref<User>;

  @prop({ ref: () => Book, required: true })
  book!: Ref<Book>;

  @prop({ default: Date.now })
  createdAt?: Date;

  @prop({ default: Date.now })
  updatedAt?: Date;
}
export const RoleModel = getModelForClass(Role);
