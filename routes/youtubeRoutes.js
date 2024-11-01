const express = require("express");
const { getYoutubePlaylist } = require("../controllers/youtubeController");

const router = express.Router();

router.get("/", getYoutubePlaylist);

module.exports = router;
