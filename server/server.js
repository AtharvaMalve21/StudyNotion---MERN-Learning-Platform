import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import connectToCloudinary from "./config/cloudinary.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

//route handlers
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import ratingAndReviewRoutes from "./routes/rating-and-review.routes.js";
import courseRoutes from "./routes/course.routes.js";
import sectionRoutes from "./routes/section.routes.js";
import subSectionRoutes from "./routes/sub-section.routes.js";

//initialize app instance
const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
  })
);
app.use(cookieParser());

//connect to Mongo Database
connectDB();

//connect to cloudinary
connectToCloudinary();

// route handlers
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/rating-and-review", ratingAndReviewRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/section", sectionRoutes);
app.use("/api/sub-section", subSectionRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Study Notion" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port http://localhost:${PORT} `);
});
