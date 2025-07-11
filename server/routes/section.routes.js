import express from "express";
const router = express.Router();

import {
  createSection,
  showAllSections,
  updateExistingSection,
  deleteExistingSection,
} from "../controllers/section.controller.js";

import {
  isAuthenticated,
  isAuthorized,
} from "../middleware/auth.middleware.js";

router.post("/:id", isAuthenticated, isAuthorized("Instructor"), createSection);

router.get("/", showAllSections);

router.put(
  "/:id",
  isAuthenticated,
  isAuthorized("Instructor"),
  updateExistingSection
);

router.delete(
  "/:id",
  isAuthenticated,
  isAuthorized("Instructor"),
  deleteExistingSection
);

export default router;
