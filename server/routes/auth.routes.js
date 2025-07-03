import express from "express";
const router = express.Router();

import {
  signup,
  login,
  logout,
  verifyAccount,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

// User Registration
router.post("/signup", signup);

// User Login
router.post("/login", login);

// User Logout
router.get("/logout", isAuthenticated, logout);

// Verify Account
router.post("/verify-account", verifyAccount);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password", resetPassword);

export default router;
