import mongoose from "mongoose";
import { Request } from "express";

import {
  bookRepository,
  borrowRepository,
  memberRepository,
} from "../repositories";
import { BorrowModel } from "../models";

class BorrowService {
  async getAll() {
    const borrows = await borrowRepository.getAll(null, ["member book"]);
    if (!borrows.length) {
      return this.createResponse(404, { error: "Borrows not found" }, false);
    }
    return this.createResponse(200, { data: borrows }, true);
  }

  async create(req: Request) {
    const { memberId, bookId, numberSelectedBooks, newStock } = req.body;
    const book = await bookRepository.getOne(bookId);
    const member = await memberRepository.getOne(memberId);
    if (!member || !book) {
      return this.createResponse(
        404,
        { error: "Member and/or book not found" },
        false
      );
    }
    const borrow = new BorrowModel({
      member: member._id,
      book: book._id,
      stock: numberSelectedBooks,
    });
    const createdBorrow = await borrowRepository.create(borrow);
    if (!createdBorrow) {
      return this.createResponse(
        500,
        { error: "Borrow was not create" },
        false
      );
    }
    await bookRepository.update(book._id.toString(), { stock: newStock });
    await memberRepository.update([member._id.toString()], { borrowedAt: Date.now() });
    return this.createResponse(
      201,
      { data: await createdBorrow.populate("member book") },
      true
    );
  }

  async delete(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return this.createResponse(404, { error: "Invalid ID" }, false);
    }
    const borrow = await borrowRepository.getOne(id);
    const now = Date.now();
    const oneMinuteOffset = 60000;
    if (
      borrow &&
      borrow.createdAt &&
      borrow.createdAt.getTime() < now - oneMinuteOffset
    ) {
      await memberRepository.changeStatus(
        borrow.member._id.toString(),
        "bloqueado"
      );
    }
    const deletedBorrow = await borrowRepository.delete(id, now);
    if (!deletedBorrow) {
      return this.createResponse(404, { error: "Borrow not found" }, false);
    }
    if (borrow && borrow.book) {
      await bookRepository.update(borrow.book._id.toString(), {
        stock: await borrow?.getBookStock() + borrow.stock,
      });
    }
    return this.createResponse(200, { data: deletedBorrow }, true);
  }

  private createResponse(statusCode: number, data: any, success: boolean) {
    return {
      statusCode,
      data: {
        ...data,
        success,
      },
    };
  }
}
export const borrowService = new BorrowService();
