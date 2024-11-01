const express = require("express");
const { getSpotifyPlaylists } = require("../controllers/spotifyController");

const router = express.Router();

router.get("/playlists", getSpotifyPlaylists);

module.exports = router;
