import express from "express";
const router = express.Router();

import {
  addCategory,
  showAllCategory,
  categoryPageDetails,
} from "../controllers/category.controller.js";

import {
  isAuthenticated,
  isAuthorized,
} from "../middleware/auth.middleware.js";

router.post("/", isAuthenticated, isAuthorized("Instructor"), addCategory);

router.get("/", showAllCategory);

router.post("/details", categoryPageDetails);

export default router;
