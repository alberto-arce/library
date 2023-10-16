import { BorrowModel } from "../models";

class BorrowRepository {
  async getBorrows() {
    return BorrowModel.find().exec();
  }
  
  async createBorrow(borrow: any) {
    return BorrowModel.create(borrow);
  }
}
export const borrowRepository = new BorrowRepository();
