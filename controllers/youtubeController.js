const axios = require("axios");

exports.getYoutubePlaylist = async (req, res) => {
  const YT_BASE_URL = "https://www.googleapis.com/youtube/v3/playlistItems";
  try {
    const response = await axios.get(YT_BASE_URL, {
      params: {
        key: process.env.YT_API_KEY,
        playlistId: process.env.YT_PLAYLIST_ID_ALL,
        part: "snippet",
        maxResults: 50,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching YouTube playlist:", error);
    res.status(500).json({ error: "Failed to fetch YouTube playlist data" });
  }
};
