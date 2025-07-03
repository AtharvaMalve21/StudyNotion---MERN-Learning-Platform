import express from "express";
const router = express.Router();

import {
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/user.controller.js";

import {
  isAuthenticated,
  isAuthorized,
} from "../middleware/auth.middleware.js";

import upload from "../utils/fileUploader.js";

router.get("/profile", isAuthenticated, getProfile);

router.put(
  "/edit-profile",
  upload.single("profileImage"),
  isAuthenticated,
  updateProfile
);

router.delete(
  "/profile/:id",
  isAuthenticated,
  isAuthorized("Admin"),
  deleteProfile
);

export default router;
