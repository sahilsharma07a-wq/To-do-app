import { Router } from "express";
import {
    registeruser, loginuser, logoutuser
} from "../controllers/user.controller.js";
import {
    todoData, updateData, deleteData, completionTask,getTodos
}
    from "../controllers/todo.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = Router();

router.route("/register").post(registeruser);
router.route("/login").post(loginuser);
// protected routes
router.route("/logout/:id").post(authMiddleware,logoutuser);
router.route("/todos").post(authMiddleware, todoData);
router.route("/todos").get(authMiddleware, getTodos); 
router.route("/update/:id").put(authMiddleware, updateData);
router.route("/delete/:id").post(authMiddleware, deleteData);
router.route("/complete/:id").post(authMiddleware, completionTask);

export default router;