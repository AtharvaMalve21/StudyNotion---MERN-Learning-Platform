import express from "express";
const router = express.Router();

import {
  addCategory,
  showAllCategory,
} from "../controllers/category.controller.js";

import {
  isAuthenticated,
  isAuthorized,
} from "../middleware/auth.middleware.js";

router.post("/", isAuthenticated, isAuthorized("Instructor"), addCategory);

router.get("/", showAllCategory);

export default router;
