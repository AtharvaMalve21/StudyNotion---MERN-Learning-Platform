import express from "express";
const router = express.Router();

import {
  addReview,
  getReview,
  updateReview,
  deleteReview,
} from "../controllers/rating-and-review.controller.js";

import {
  isAuthenticated,
  isAuthorized,
} from "../middleware/auth.middleware.js";

router.post("/:id", isAuthenticated, isAuthorized("Student"), addReview);

router.get("/:id", getReview);

router.put("/:id", isAuthenticated, isAuthorized("Student"), updateReview);

router.delete("/:id", isAuthenticated, isAuthorized("Student"), deleteReview);

export default router;
