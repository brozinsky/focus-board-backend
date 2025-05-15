const express = require("express");
const { getYoutubePlaylist } = require("../controllers/youtubeController");
const { refreshAllPlaylists } = require("../controllers/ytRefreshController");

const router = express.Router();

router.get("/refresh-playlists", refreshAllPlaylists);
router.get("/nature", (req, res) =>
  getYoutubePlaylist(req, res, "PL63FRV16o5n2hKZQEGiLXIDllxETkkSsL")
);
router.get("/scifi", (req, res) =>
  getYoutubePlaylist(req, res, "PL63FRV16o5n1i_LR_rqTvJH6Yi9D_jfSg")
);
router.get("/city-walk", (req, res) =>
  getYoutubePlaylist(req, res, "PL63FRV16o5n1VjprnQwEcEQi2FUare8Yr")
);
router.get("/lofi", (req, res) =>
  getYoutubePlaylist(req, res, "PL63FRV16o5n3Xixr8oyCtI12wIv4aNpVu")
);
router.get("/retro", (req, res) =>
  getYoutubePlaylist(req, res, "PL63FRV16o5n34NHOJRlbndI4cS-jv7JiW")
);
router.get("/movies-games", (req, res) =>
    getYoutubePlaylist(req, res, "PL63FRV16o5n1WoheVadzQaWXly1FVcXG3")
  );
router.get("/music", (req, res) =>
  getYoutubePlaylist(req, res, "PL63FRV16o5n1bs9083LT6HI6VesBuMT_n")
);

module.exports = router;
