import { Router } from "express";
import {
    registeruser, loginuser
} from "../controllers/user.controller.js";
import {
    todoData, updateData,deleteData
}
    from "../controllers/todo.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = Router();

router.route("/register").post(registeruser);
router.route("/login").post(loginuser);
// protected routes
router.route("/todos").post(authMiddleware, todoData);
router.route("/update/:id").put(authMiddleware, updateData);
router.route("/delete/:id").post(authMiddleware,deleteData);


export default router;