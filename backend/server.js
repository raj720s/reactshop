import express from "express";
const app = express();
import products from "./data/products.js";
import cors from "cors";
import env from "dotenv";
import productRoutes from "./routes/productRouter.js";
import connectDb from "./config/db.js";
import { errorMidware, notFoundMiddware } from "./middleware/errorMidware.js";
import { userRoutes } from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoute from "./routes/uploadRoutes.js";
import path from "path";

env.config();

connectDb();

app.use(express.json());

//pathc static
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// routes

// app.get("/", (req, res) => {
//   res.send("5000 is running");
// });

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoute);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_ID);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/brad/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "brad", "public", "index.html"));
  }); // * is any thing exceopt these declared routes
} else {
  app.get("/", (req, res) => {
    res.send("api is running");
  });
}

app.use(notFoundMiddware);
app.use(errorMidware);
app.use(cors());

// port
app.listen(process.env.PORT || 5000, () => {
  console.log("running on 5000 port");
});
