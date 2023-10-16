import { Request } from "express";

import {
  bookRepository,
  borrowRepository,
  memberRepository,
} from "../repositories";
import { BorrowModel } from "../models";

class BorrowService {
  async getBorrows() {
    const borrows = await borrowRepository.getBorrows();
    if (!borrows) {
      return {
        statusCode: 500,
        data: {
          error: "Internal server error",
          success: false,
        },
      };
    }
    return {
      statusCode: 200,
      data: {
        data: borrows,
        success: true,
      },
    };
  }

  async createBorrow(req: Request) {
    const { memberId, bookId } = req.body;
    const book = await bookRepository.getBookById(bookId);
    const member = await memberRepository.getMemberById(memberId);
    if (!member || !book) {
      return {
        statusCode: 404,
        data: {
          error: "Member and/or book not found",
          success: false,
        },
      };
    }
    const borrow = new BorrowModel({
      member: member._id,
      book: book._id,
    });
    const createdBorrow = await borrowRepository.createBorrow(borrow);
    if (!createdBorrow) {
      return {
        statusCode: 500,
        data: {
          error: "Borrow was not create",
          success: false,
        },
      };
    }
    return {
      statusCode: 201,
      data: {
        data: createdBorrow,
        success: true,
      },
    };
  }
}
export const borrowService = new BorrowService();
