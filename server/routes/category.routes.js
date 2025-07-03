import express from "express";
const router = express.Router();

import {
  createCategory,
  showAllCategories,
} from "../controllers/category.controller.js";

import {
  isAuthenticated,
  isAuthorized,
} from "../middleware/auth.middleware.js";

router.post("/", isAuthenticated, isAuthorized("Instructor"), createCategory);

router.get("/", showAllCategories);

export default router;
