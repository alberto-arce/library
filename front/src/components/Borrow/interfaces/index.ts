export interface IBorrow {
  _id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  member: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  book: any;
  createdAt: Date;
  deletedAt: Date | null;
}
