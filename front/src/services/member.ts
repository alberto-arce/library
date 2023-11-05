import { api } from "./api";

import { IMember } from "../components/BorrowModal/interfaces";

interface IResponse {
  data?: IMember[];
  error?: string;
  success: boolean;
}

interface ICreateMember {
  name: string;
}

interface IUpdateMember {
  name: string;
}

interface IService {
  getMembers: () => Promise<IResponse>;
  createMember: (newMember: ICreateMember) => Promise<IResponse>;
  updateMember: (_id: string, updateMember: IUpdateMember) => Promise<IResponse>;
  deleteMember: (_id: string) => Promise<IResponse>;
}

export const memberService: IService = {
  getMembers: () => api.get("/members"),
  createMember: (newMember: ICreateMember) => api.post("/members", newMember),
  updateMember: (_id: string, updateMember: IUpdateMember) => api.put(`/members/${_id}`, updateMember),
  deleteMember: (_id: string) => api.delete(`/members/${_id}`),
};
