import mongoose from "mongoose";
import { Request } from "express";

import { borrowRepository, memberRepository } from "../repositories";

class MemberService {
  async getAll() {
    let members = await memberRepository.getAll();
    const now = Date.now();
    const oneMinuteOffset = 300000;
    const memberIds = members
      .filter(
        (member) =>
          member &&
          member.borrowedAt &&
          member.borrowedAt.getTime() < now - oneMinuteOffset
      )
      .map((member) => member.id);
    const filteredMemberIds = memberIds.filter(Boolean);
    if (filteredMemberIds.length) {
      await memberRepository.update(filteredMemberIds, { status: "activado" });
    }
    members = await memberRepository.getAll();
    if (!members.length) {
      return this.createResponse(404, { error: "Members not found" }, false);
    }
    return this.createResponse(200, { data: members }, true);
  }

  async getOne(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return memberRepository.getOne(id);
  }

  async create(req: Request) {
    const createdMember = await memberRepository.create({ ...req.body });
    if (!createdMember) {
      return this.createResponse(
        500,
        { error: "Member was not created" },
        false
      );
    }
    return this.createResponse(201, { data: createdMember }, true);
  }

  async update(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return this.createResponse(400, { error: "Invalid ID" }, false);
    }
    const updatedMember = await memberRepository.update(id, { ...req.body });
    if (!updatedMember) {
      return this.createResponse(
        500,
        { error: "Member was not updated" },
        false
      );
    }
    return this.createResponse(200, { data: updatedMember }, true);
  }

  async delete(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return this.createResponse(400, { error: "Invalid ID" }, false);
    }
    const memberBorrows = await borrowRepository.getAll({ member: id }, [
      "member",
    ]);
    const hasActiveBorrows = memberBorrows.some(
      (borrow) => borrow && !borrow.deletedAt
    );
    if (hasActiveBorrows) {
      return this.createResponse(
        200,
        { error: "No se pudo eliminar. Tiene libros prestados" },
        false
      );
    }
    const deletedMember = await memberRepository.delete(id);
    if (!deletedMember) {
      return this.createResponse(500, { error: "No se pudo eliminar" }, false);
    }
    return this.createResponse(200, { data: deletedMember }, true);
  }

  async changeStatus(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return this.createResponse(400, { error: "Invalid ID" }, false);
    }
    const updatedMember = await memberRepository.changeStatus(id, "activado");
    if (!updatedMember) {
      return this.createResponse(
        500,
        { error: "Status was not changed" },
        false
      );
    }
    return this.createResponse(200, { data: updatedMember }, true);
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
export const memberService = new MemberService();
