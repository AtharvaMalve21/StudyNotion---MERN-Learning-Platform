import express from "express";
const router = express.Router();

import {
  createReview,
  getReviews,
  deleteReview,
} from "../controllers/rating-and-review.controller.js";

import {
  isAuthenticated,
  isAuthorized,
} from "../middleware/auth.middleware.js";

router.post("/:id", isAuthenticated, isAuthorized("Student"), createReview);

router.get(
  "/:id",
  getReviews
);

router.delete("/:id", isAuthenticated, isAuthorized("Student"), deleteReview);

export default router;
