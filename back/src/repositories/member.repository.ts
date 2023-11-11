import { MemberModel } from "../models";

class MemberRepository {
  async getAll() {
    return MemberModel.find().exec();
  }

  async getOne(id: string) {
    return MemberModel.findById(id).exec();
  }

  async create(newMember: any) {
    return MemberModel.create(newMember);
  }

  async update(id: string, updateMember: any) {
    return MemberModel.findByIdAndUpdate(id, updateMember, {
      new: true,
    }).exec();
  }

  async delete(id: string) {
    return MemberModel.findByIdAndRemove(id).exec();
  }

  async changeStatus(id: string, status: string) {
    return MemberModel.findByIdAndUpdate(id, { status }).exec();
  }
}
export const memberRepository = new MemberRepository();
