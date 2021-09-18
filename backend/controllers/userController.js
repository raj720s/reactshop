import expressAsyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

export const authUserController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    //match password is a model function
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid details");
  }
});

export const registerUserController = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  const user = await UserModel.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user");
  }
});
export const getAllusers = expressAsyncHandler(async (req, res) => {
  const users = await UserModel.find({});
  res.json(users);
});
export const getUserProfileController = expressAsyncHandler(
  async (req, res) => {
    const user = await UserModel.findById(req.user._id);
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("user not found");
    }
  }
);
export const updateUserByIdcontroller = expressAsyncHandler(
  async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      (user.name = req.body.name || user.name),
        (user.email = req.body.email || user.email),
        (user.isAdmin = req.body.isAdmin);

      const updateduser = await user.save();
      res.json({
        _id: updateduser._id,
        name: updateduser.name,
        email: updateduser.email,
        isAdmin: updateduser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("user not found");
    }
  }
);

export const getUserByIdcontroller = expressAsyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

export const updateUserProfileController = expressAsyncHandler(
  async (req, res) => {
    // recieves nthe req user from userAction  from frfont end
    const user = await UserModel.findById(req.user._id);
    // RECIEVES the user object
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);

export const deleteUsercontroller = expressAsyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
