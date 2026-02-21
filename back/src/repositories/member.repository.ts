import { Filter } from 'mongodb';

import { Member, MemberModel } from "../models";

class MemberRepository {
  async getAll(criteria?: Filter<Member>) {
    return MemberModel.find({filter: criteria}).exec();
  }

  async getOne(id: string) {
    return MemberModel.findById(id).exec();
  }

  async create(newMember: Member) {
    return MemberModel.create(newMember);
  }

  async update(ids: string | string[], updateMember: Partial<Member>) {
    const idArray = Array.isArray(ids) ? ids : [ids];
    await MemberModel.updateMany(
      { _id: { $in: idArray } },
      { ...updateMember }
    ).exec();
    return MemberModel.find({ _id: { $in: idArray } }).exec();
  }

  async delete(id: string) {
    return MemberModel.findByIdAndDelete(id).exec();
  }

  async changeStatus(id: string, status: string) {
    return MemberModel.findByIdAndUpdate(id, { status }).exec();
  }
}
export const memberRepository = new MemberRepository();
