import { prop, getModelForClass } from "@typegoose/typegoose";

export class Member {
  @prop({
    unique: true,
    required: true,
    type: Number,
    validate: {
      validator: (value: number) => {
        return /^[0-9]{8}$/.test(value.toString());
      },
      message: 'El DNI debe tener exactamente 8 dígitos.'
    },
  })
  dni!: number;

  @prop({ required: true, type: String })
  name!: string;

  @prop({ required: true, type: String })
  lastname!: string;

  @prop({ default: "activado", type: String })
  status!: string;

  @prop({ default: Date.now, type: Date })
  createdAt?: Date;

  @prop({ default: null, type: () => Date })
  borrowedAt?: Date | null;

  @prop({ default: null, type: () => Date })
  deletedAt?: string | null;
}
export const MemberModel = getModelForClass(Member);
