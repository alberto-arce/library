import express from "express";

import {
  getMembers,
  createMember,
  deleteMember,
} from "../controllers";

const router = express.Router();

router.get("/members", getMembers);
router.post("/members", createMember);
router.delete("/members/:id", deleteMember);

export { router };
