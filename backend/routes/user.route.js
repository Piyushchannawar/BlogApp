import express from "express";
import { test, test2, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get("/", test);
router.get("/test", test2);
router.put("/update/:userId", verifyToken ,updateUser)

export default router;