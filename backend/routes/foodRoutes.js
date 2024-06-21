const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createFood } = require("../controller/foodController");

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post("/add-food", upload.single("image"), createFood);

module.exports = router;
