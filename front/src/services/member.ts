import { api } from "./api";

import { IMemberResponse } from "./interface";

interface ICreateMember {
  name: string;
}

interface IUpdateMember {
  name: string;
}

interface IService {
  getAll: () => Promise<IMemberResponse>;
  create: (newMember: ICreateMember) => Promise<IMemberResponse>;
  update: (
    _id: string,
    updateMember: IUpdateMember
  ) => Promise<IMemberResponse>;
  delete: (_id: string) => Promise<IMemberResponse>;
  changeStatus: (_id: string) => Promise<IMemberResponse>;
}

export const memberService: IService = {
  getAll: () => api.get("/members"),
  create: (newMember: ICreateMember) => api.post("/members", newMember),
  update: (_id: string, updateMember: IUpdateMember) =>
    api.put(`/members/${_id}`, updateMember),
  delete: (_id: string) => api.delete(`/members/${_id}`),
  changeStatus: (_id: string) => api.put(`/members/change-status/${_id}`),
};
