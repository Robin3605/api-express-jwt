import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { verifyToken, isAdmin, isModerator } from "../middleware/auth.jwt.js";

const router = Router();

router.get("/", getProducts);
router.post("/", [verifyToken, isAdmin, isModerator], createProduct);
router.get("/:id", getProductById);
router.put("/:id", [verifyToken, isAdmin, isModerator], updateProduct);
router.delete("/:id", [verifyToken, isAdmin, isModerator], deleteProduct);

export default router;
