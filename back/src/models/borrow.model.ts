import { prop, Ref, getModelForClass } from '@typegoose/typegoose';

import { Book } from './book.model';
import { Member } from './member.model';

export class Borrow {
  @prop({ ref: () => Member, required: true })
  member!: Ref<Member>;

  @prop({ ref: () => Book, required: true })
  book!: Ref<Book>;

  @prop({ default: Date.now, type: Date })
  createdAt?: Date;

  @prop({ default: null, type: () => Date })
  deletedAt?: Date | null;
}
export const BorrowModel = getModelForClass(Borrow);
