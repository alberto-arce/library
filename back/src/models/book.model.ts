import { prop, getModelForClass } from '@typegoose/typegoose';

export class Book { 
  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  author!: string;

  @prop({ required: true, unique: true })
  isbn!: string;

  @prop({ required: true })
  stock!: number;

  @prop({ default: Date.now })
  createdAt?: Date;

  @prop({ default: Date.now })
  updatedAt?: Date;
}
export const BookModel = getModelForClass(Book);
