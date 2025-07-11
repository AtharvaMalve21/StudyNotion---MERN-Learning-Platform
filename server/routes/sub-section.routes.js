import express from "express";
const router = express.Router();

import {
  createSubSection,
  showAllSubSections
} from "../controllers/sub-section.controller.js";

import {
  isAuthenticated,
  isAuthorized,
} from "../middleware/auth.middleware.js";

router.post("/:id", isAuthenticated, isAuthorized("Instructor"), createSubSection);

router.get("/", showAllSubSections);

export default router;
