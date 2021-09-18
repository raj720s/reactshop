import express from "express";
import {
  authUserController,
  deleteUsercontroller,
  getAllusers,
  getUserByIdcontroller,
  getUserProfileController,
  registerUserController,
  updateUserByIdcontroller,
  updateUserProfileController,
} from "../controllers/userController.js";
import { Checkadmin, checkAuthMiddware } from "../middleware/authMiddware.js";
const userRoutes = express.Router();

userRoutes.get("/allusers", checkAuthMiddware, Checkadmin, getAllusers);

userRoutes.post("/register", registerUserController);

userRoutes.post("/login", authUserController);

userRoutes.get("/profile", checkAuthMiddware, getUserProfileController);

userRoutes.put("/profile", checkAuthMiddware, updateUserProfileController);
userRoutes.delete(
  "/delete/:id",
  checkAuthMiddware,
  Checkadmin,
  deleteUsercontroller
);
userRoutes.get(
  "/user/:id",
  checkAuthMiddware,
  Checkadmin,
  getUserByIdcontroller
);
userRoutes.put(
  "/user/:id",
  checkAuthMiddware,
  Checkadmin,
  updateUserByIdcontroller
);

export { userRoutes };
