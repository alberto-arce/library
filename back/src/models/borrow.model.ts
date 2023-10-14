import { prop, Ref, getModelForClass } from '@typegoose/typegoose';

import { Book } from './book.model';
import { Member } from './member.model';

export class Borrow {
  @prop({ ref: () => Member, required: true })
  member!: Ref<Member>;

  @prop({ ref: () => Book, required: true })
  book!: Ref<Book>;

  @prop({ default: Date.now })
  createdAt?: Date;

  @prop({ default: Date.now })
  updatedAt?: Date;
}
export const BorrowModel = getModelForClass(Borrow);
