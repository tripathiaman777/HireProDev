import express from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProduct,
} from "../controllers/product.controller.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

router.get("/getAllProducts", verifyToken, getAllProduct);
router.post("/addProduct", verifyToken, addProduct);
router.post("/editProduct/:id", verifyToken, editProduct);
router.delete("/deleteProduct/:id", verifyToken, deleteProduct);

export default router;
