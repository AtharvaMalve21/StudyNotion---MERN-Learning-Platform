import express from "express";
const router = express.Router();
import upload from "../utils/fileUploader.js";

import {
  createSubSection,
  showAllSubSections,
} from "../controllers/sub-section.controller.js";

import {
  isAuthenticated,
  isAuthorized,
} from "../middleware/auth.middleware.js";

router.post(
  "/:id",
  isAuthenticated,
  upload.single("videoURL"),
  isAuthorized("Instructor"),
  createSubSection
);

router.get("/", showAllSubSections);

export default router;
