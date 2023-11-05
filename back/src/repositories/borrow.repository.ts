import { BorrowModel } from "../models";

class BorrowRepository {
  async getBorrows() {
    return BorrowModel.find().populate("member book").exec();
  }

  async createBorrow(borrow: any) {
    return BorrowModel.create(borrow);
  }

  async deleteBorrow(id: string) {
    return BorrowModel.findByIdAndUpdate(id, { deletedAt: Date.now() }).exec();
  }
}
export const borrowRepository = new BorrowRepository();
