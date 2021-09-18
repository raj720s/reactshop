import express from "express";
import {
  addOrderItems,
  getMyOrdersController,
  getOrderbyIdcontroller,
  getOrdersController,
  updateOrderAsDeliveredController,
  updateOrderAsPaidbyAdminController,
  updateOrderAsPaidController,
} from "../controllers/orderController.js";
import { Checkadmin, checkAuthMiddware } from "../middleware/authMiddware.js";
const orderRoutes = express.Router();

// get all products from /api/products
orderRoutes.post("/", checkAuthMiddware, addOrderItems);
// get product by id from api/products/id
orderRoutes.get("/", checkAuthMiddware, Checkadmin, getOrdersController);

orderRoutes.get("/myorders", checkAuthMiddware, getMyOrdersController);

orderRoutes.get("/:id", checkAuthMiddware, getOrderbyIdcontroller);
orderRoutes.put("/:id/pay", checkAuthMiddware, updateOrderAsPaidController);
orderRoutes.put(
  "/:id/pay/admin",
  checkAuthMiddware,
  Checkadmin,
  updateOrderAsPaidbyAdminController
);
orderRoutes.put(
  "/:id/deliver",
  checkAuthMiddware,
  Checkadmin,
  updateOrderAsDeliveredController
);

export default orderRoutes;
