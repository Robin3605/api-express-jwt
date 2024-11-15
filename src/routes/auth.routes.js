import { Router } from "express";
import { singin, singup } from "../controllers/auth.controller.js";
import {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} from "../middleware/verify.singup.js";

const router = Router();

router.post("/singin", singin);

router.post(
  "/singup",
  [checkDuplicateUsernameOrEmail, checkRolesExisted],
  singup
);

export default router;
