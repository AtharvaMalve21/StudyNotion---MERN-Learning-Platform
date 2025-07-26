import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in. Please login to continue.",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken._id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. User not found. Please login again.",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Authentication failed. Please try again later.",
    });
  }
};

export const isAuthorized = (...accountType) => {
  
  return async function (req, res, next) {
    const account = req.user.accountType;

    try {
      if (!accountType.includes(account)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Only ${accountType.join(
            " or "
          )} are allowed to perform this action.`,
        });
      }
      next();
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Authorization failed. Please try again later.",
      });
    }
  };
};
