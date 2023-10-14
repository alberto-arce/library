import mongoose from "mongoose";
import { MemberModel } from "../models";

class MemberService {
  async getMembers() {
    return MemberModel.find().exec();
  }

  async createMember(newMember: any) {
    return MemberModel.create(newMember);
  }
  
  async deleteMember(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    const deletedMember= await MemberModel.findByIdAndRemove(id).exec();
    if (!deletedMember) {
      throw new Error("Member not found");
    }
    return deletedMember;
  }
}
export const memberService = new MemberService();
