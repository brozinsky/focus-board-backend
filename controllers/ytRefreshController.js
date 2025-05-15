const { getYoutubePlaylist } = require("./youtubeController");

const PLAYLIST_IDS = {
  nature: "PL63FRV16o5n2hKZQEGiLXIDllxETkkSsL",
  scifi: "PL63FRV16o5n1i_LR_rqTvJH6Yi9D_jfSg",
  cityWalk: "PL63FRV16o5n1VjprnQwEcEQi2FUare8Yr",
  lofi: "PL63FRV16o5n3Xixr8oyCtI12wIv4aNpVu",
  retro: "PL63FRV16o5n34NHOJRlbndI4cS-jv7JiW",
  moviesGames: "PL63FRV16o5n1WoheVadzQaWXly1FVcXG3",
  music: "PL63FRV16o5n1bs9083LT6HI6VesBuMT_n",
};

exports.refreshAllPlaylists = async (req, res) => {
  try {
    const results = [];

    for (const [name, playlistId] of Object.entries(PLAYLIST_IDS)) {
      await getYoutubePlaylist({ query: {} }, { json: () => {} }, playlistId);
      results.push(name);
    }

    res.json({ success: true, refreshed: results });
  } catch (error) {
    console.error("Failed to refresh playlists:", error);
    res.status(500).json({ error: "Refresh failed" });
  }
};
