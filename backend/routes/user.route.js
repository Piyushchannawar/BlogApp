import express from "express";
import { deleteUser, getUsers, signout, test, test2, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get("/", test);
router.get("/test", test2);
router.put("/update/:userId", verifyToken ,updateUser)
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout)
router.get("/getusers", verifyToken, getUsers)

export default router;