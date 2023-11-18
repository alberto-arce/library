import { MemberModel } from "../models";

class MemberRepository {
  async getAll(criteria?: any) {
    return MemberModel.find({ ...criteria }).exec();
  }

  async getOne(id: string) {
    return MemberModel.findById(id).exec();
  }

  async create(newMember: any) {
    return MemberModel.create(newMember);
  }

  async update(ids: string | string[], updateMember: any) {
    return MemberModel.updateMany(
      { _id: { $in: ids } },
      { ...updateMember },
      {
        new: true,
      }
    ).exec();
  }

  async delete(id: string) {
    return MemberModel.findByIdAndRemove(id).exec();
  }

  async changeStatus(id: string, status: string) {
    return MemberModel.findByIdAndUpdate(id, { status }).exec();
  }
}
export const memberRepository = new MemberRepository();
