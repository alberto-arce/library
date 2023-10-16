import { MemberModel } from "../models";

class MemberRepository {
  async getMembers() {
    return MemberModel.find().exec();
  }

  async getMemberById(id: string) {
    return MemberModel.findById(id).exec();
  }

  async createMember(newMember: any) {
    return MemberModel.create(newMember);
  }

  async deleteMember(id: string) {
    return MemberModel.findByIdAndRemove(id).exec();
  }
}
export const memberRepository = new MemberRepository();
