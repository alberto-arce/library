import { prop, Ref, getModelForClass, DocumentType } from '@typegoose/typegoose';

import { Book } from './book.model';
import { Member } from './member.model';

export class Borrow {
  @prop({ ref: () => Member, required: true })
  member!: Ref<Member>;

  @prop({ ref: () => Book, required: true })
  book!: Ref<Book>;

  @prop({ type: Number })
  stock!: number;
 
  @prop({ default: Date.now, type: Date })
  createdAt?: Date;

  @prop({ default: null, type: () => Date })
  deletedAt?: Date | null;

  async getBookStock(this: DocumentType<Borrow>) {
    await this.populate('book');
    return (this.book as DocumentType<Book>).stock;
  }
}
export const BorrowModel = getModelForClass(Borrow);
