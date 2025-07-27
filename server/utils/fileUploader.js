import multer from "multer";
import path from "path";

// Allowed file types
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "video/mp4": "mp4",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Validate file type
    const isValid = FILE_TYPE_MAP[file.mimetype];
    if (isValid) {
      cb(null, "./uploads");
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
  filename: function (req, file, cb) {
    const extension = FILE_TYPE_MAP[file.mimetype];
    const baseName = path.parse(file.originalname).name.replace(/\s+/g, "_");
    cb(null, `${Date.now()}_${baseName}.${extension}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit (adjust as needed)
  },
  fileFilter: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    if (isValid) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file format"), false);
    }
  },
});

export default upload;
