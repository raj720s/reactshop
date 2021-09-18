import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

export const checkAuthMiddware = expressAsyncHandler(async (req, res, nxt) => {
  // let token;
  // let tokenPresent =
  //   req.headers.authorizaton && req.headers.authorizaton.startsWith("Bearer");
  // if (tokenPresent) {
  //   try {
  //     // tries to verify the token
  //     token = req.headers.authorizaton.split(" ")[1];
  //     const decoded = jwt.verify(token, process.env.jwt_secret);
  //     // console.log(decoded);
  //     req.user = await UserModel.findById(decoded.id).select("-password");
  //     res.send(token);
  //     // nxt();
  //   } catch (err) {
  //     console.log({ error: err });
  //     res.status(401);
  //     throw new Error("unauthorized token");
  //   }
  // }

  // if (!tokenPresent || !token) {
  //   // if token not found
  //   res.status(401);
  //   throw new Error("token not found");
  // }

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await UserModel.findById(decoded.id).select("-password");

      nxt();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("unauthorized token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("unauthorized token");
  }
});

export const Checkadmin = (req, res, nxt) => {
  if (req.user && req.user.isAdmin) {
    nxt();
  } else {
    res.status(401);
    throw new Error("unauthorized admin");
  }
};
