import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.headers.token;
  token = token.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;
  token = req.headers.token;
  token = token.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded.isAdmin);
      if (decoded.isAdmin == true) {
        req.user = await User.findById(decoded.userId).select("-password");
      } else {
        throw new Error("Not Auth");
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect, protectAdmin };
