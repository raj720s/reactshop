import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

userSchema.pre("save", async function (nxt) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // sets the password to a salt ie.. hashed password of 10chars
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
