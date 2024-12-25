import express from "express";
import { test, test2 } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", test);
router.get("/test", test2)

export default router;