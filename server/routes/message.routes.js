import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import {
  isAuthenticated,
  isAuthorized,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/send", isAuthenticated, isAuthorized("Student"), sendMessage);

export default router;
