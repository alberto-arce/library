import { BorrowModel } from "../models";

class BorrowService {
  async getBorrows() {
    return BorrowModel.find().exec();
  }
  
  async createBorrow(borrow: any) {
    return BorrowModel.create(borrow);
  }
}
export const borrowService = new BorrowService();
