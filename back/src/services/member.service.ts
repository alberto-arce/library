import mongoose from "mongoose";
import { Request } from "express";

import { memberRepository } from "../repositories";

class MemberService {
  async getMembers() {
    const members = await memberRepository.getMembers();
    if (!members) {
      return {
        statusCode: 500,
        data: {
          error: "Members not found",
          success: false,
        },
      };
    }
    return {
      statusCode: 200,
      data: {
        data: members,
        success: true,
      },
    };
  }

  async getMemberById(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return memberRepository.getMemberById(id);
  }

  async createMember(req: Request) {
    const { name } = req.body;
    const newMember = {
      name,
    };
    const createdMember = await memberRepository.createMember(newMember);
    if (!createdMember) {
      return {
        statusCode: 500,
        data: {
          error: "Member was not create",
          success: false,
        },
      };
    }
    return {
      statusCode: 201,
      data: {
        data: createdMember,
        success: true,
      },
    };
  }

  async deleteMember(req: Request) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        statusCode: 404,
        data: {
          error: "Invalid ID",
          success: false,
        },
      };
    }
    const deletedMember = await memberRepository.deleteMember(id);
    if (!deletedMember) {
      return {
        statusCode: 500,
        data: {
          error: "Member was not delete",
          success: false,
        },
      };
    }
    return {
      statusCode: 200,
      data: {
        data: deletedMember,
        success: true,
      },
    };
  }
}
export const memberService = new MemberService();
