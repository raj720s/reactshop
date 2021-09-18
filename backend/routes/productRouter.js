import express from "express";
const productRoutes = express.Router();
import { checkAuthMiddware, Checkadmin } from "../middleware/authMiddware.js";
import {
  createProduct,
  createProductReview,
  deleteProductbyId,
  getProductsbyIdController,
  getProductsController,
  getTopProducts,
  updateProduct,
} from "../controllers/productController.js";

// get all products from /api/products
productRoutes.get("/", getProductsController);
productRoutes.get("/top", getTopProducts);
productRoutes.post("/", checkAuthMiddware, Checkadmin, createProduct);
// get product by id from api/products/id
productRoutes.get("/:id", getProductsbyIdController);
productRoutes.delete("/:id", checkAuthMiddware, Checkadmin, deleteProductbyId);
productRoutes.put("/:id", checkAuthMiddware, Checkadmin, updateProduct);
productRoutes.post("/:id/review", checkAuthMiddware, createProductReview);

export default productRoutes;
