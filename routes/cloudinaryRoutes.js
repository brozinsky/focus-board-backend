const express = require("express");
const {
  getCloudinaryVideos,
  getCloudinaryImages,
} = require("../controllers/cloudinaryController");

const router = express.Router();

router.get("/videos", getCloudinaryVideos);
router.get("/images", getCloudinaryImages);

module.exports = router;
