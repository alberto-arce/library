import { BorrowModel } from "../models";

class BorrowRepository {
  async getBorrows() {
    return BorrowModel.find().populate('member book').exec();
  }
  
  async createBorrow(borrow: any) {
    return BorrowModel.create(borrow);
  }
}
export const borrowRepository = new BorrowRepository();
