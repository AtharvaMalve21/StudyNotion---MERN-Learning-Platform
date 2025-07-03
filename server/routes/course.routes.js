import express from "express";
import upload from "../utils/fileUploader.js";
const router = express.Router();

import {
  createCourse,
  showAllCourses,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";

import {
  isAuthenticated,
  isAuthorized,
} from "../middleware/auth.middleware.js";

router.post(
  "/",
  upload.single("thumbnail"),
  isAuthenticated,
  isAuthorized("Instructor"),
  createCourse
);

router.get("/", showAllCourses);

router.put("/:id", isAuthenticated, isAuthorized("Instructor"), updateCourse);

router.delete(
  "/:id",
  isAuthenticated,
  isAuthorized("Instructor"),
  deleteCourse
);

export default router;
