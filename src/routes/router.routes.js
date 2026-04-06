import { Router } from "express";
import {
    registeruser, loginuser
} from "../controllers/user.controller.js";
const router = Router();

router.route("/register").post(registeruser);
router.route("/login").post(loginuser);

export default router;