import express from "express";
import upload from "../utils/fileUploader.js";
const router = express.Router();

import {
  createCourse,
  showAllCourses,
  getCourseDetails,
  filterCoursesByCategory,
  updateExistingCourse,
  deleteExistingCourse,
  studentEnrolledCourse,
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

router.get("/filter", filterCoursesByCategory);

router.get("/:id", getCourseDetails);

router.put(
  "/:id",
  isAuthenticated,
  isAuthorized("Instructor"),
  updateExistingCourse
);

router.delete(
  "/:id",
  isAuthenticated,
  isAuthorized("Instructor"),
  deleteExistingCourse
);

router.get(
  "/enrolled-courses",
  isAuthenticated,
  isAuthorized("Student", "Instructor"),
  studentEnrolledCourse
);

export default router;
