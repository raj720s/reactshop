import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDb = async () => {
  mongoose.connect(process.env.dbString, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  var db = mongoose.connection;
  db.on("error", () => {
    console.log("error connection");
  });
  db.once("open", function callback() {
    console.log("connected to db");
  });
};

export default connectDb;
