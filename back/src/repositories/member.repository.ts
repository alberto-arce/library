import { FilterQuery } from "mongoose";

import { Member, MemberModel } from "../models";

class MemberRepository {
  async getAll(criteria?: FilterQuery<Member>) {
    return MemberModel.find({ ...criteria }).exec();
  }

  async getOne(id: string) {
    return MemberModel.findById(id).exec();
  }

  async create(newMember: Member) {
    return MemberModel.create(newMember);
  }

  async update(ids: string | string[], updateMember: Partial<Member>) {
    return MemberModel.updateMany(
      { _id: { $in: ids } },
      { ...updateMember },
      {
        new: true,
      }
    ).exec();
  }

  async delete(id: string) {
    return MemberModel.findByIdAndDelete(id).exec();
  }

  async changeStatus(id: string, status: string) {
    return MemberModel.findByIdAndUpdate(id, { status }).exec();
  }
}
export const memberRepository = new MemberRepository();
