import { api } from "./api";

interface IMember {
  _id: string;
  name: string;
}

interface IDeleteResponse {
  message: string;
  ok: boolean;
}

interface ICreateMember {
  name: string;
}

interface IService {
  getMembers: () => Promise<IMember[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createMember: (newMember: ICreateMember) => Promise<any>;
  deleteMember: (_id: string) => Promise<IDeleteResponse>;
}

export const memberService: IService = {
  getMembers: () => api.get("/members"),
  createMember: (newMember: ICreateMember) => api.post("/members", newMember),
  deleteMember: (_id: string) => api.delete(`/members/${_id}`),
};
