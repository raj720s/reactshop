import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import UserModel from "./models/userModel.js";
import ProductModel from "./models/productModel.js";
import OrderModedl from "./models/orderModel.js";
import connectDb from "./config/db.js";

connectDb();

dotenv.config();

const importData = async () => {
  try {
    await OrderModedl.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    const createdUsers = await UserModel.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((p) => {
      return { ...p, user: adminUser };
    });
    await ProductModel.insertMany(sampleProducts);
    console.log("imported");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};
const destroyData = async () => {
  try {
    await OrderModedl.deleteMany();
    await UserModel.deleteMany();
    await ProductModel.deleteMany();
    console.log("deleted datta");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

if (process.argv[2] === "-d") {
  // argv are the arguments passed from the package.json script data
  destroyData();
} else {
  importData();
}
