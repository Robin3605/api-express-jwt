import { Router } from "express";
import { createUsers } from "../controllers/users.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.jwt.js";
import { checkRolesExisted } from "../middleware/verify.singup.js";

const router = Router();

router.post("/", [verifyToken, isAdmin, checkRolesExisted], createUsers);

export default router;
