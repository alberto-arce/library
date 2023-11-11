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
  getAll: () => Promise<IResponse>;
  create: (newMember: ICreateMember) => Promise<IResponse>;
  update: (_id: string, updateMember: IUpdateMember) => Promise<IResponse>;
  delete: (_id: string) => Promise<IResponse>;
  changeStatus: (_id: string) => Promise<IResponse>;
}

export const memberService: IService = {
  getAll: () => api.get("/members"),
  create: (newMember: ICreateMember) => api.post("/members", newMember),
  update: (_id: string, updateMember: IUpdateMember) => api.put(`/members/${_id}`, updateMember),
  delete: (_id: string) => api.delete(`/members/${_id}`),
  changeStatus: (_id: string) => api.put(`/members/change-status/${_id}`),
};
