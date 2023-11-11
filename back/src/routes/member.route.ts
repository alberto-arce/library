import express from "express";

import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
  changeStatus
} from "../controllers";

const router = express.Router();

router.get("/members", getMembers);
router.post("/members", createMember);
router.put("/members/:id", updateMember);
router.delete("/members/:id", deleteMember);
router.put("/members/change-status/:id", changeStatus);

export { router };
