const axios = require("axios");

const cache = {};
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

exports.getYoutubePlaylist = async (req, res, playlistId) => {
  const YT_BASE_URL = "https://www.googleapis.com/youtube/v3/playlistItems";

  if (!playlistId) {
    return res.status(400).json({ error: "Missing playlistId" });
  }

  const now = Date.now();
  const cached = cache[playlistId];

  if (cached && now - cached.timestamp < CACHE_TTL) {
    console.log(`[CACHE] Returning cached data for playlist ${playlistId}`);
    return res.json(cached.data); // return cached data
  }

  console.log(`[FETCH] Fetching fresh data for playlist ${playlistId}`);

  try {
    const response = await axios.get(YT_BASE_URL, {
      params: {
        key: process.env.YT_API_KEY,
        playlistId,
        part: "snippet",
        maxResults: 50,
      },
    });

    cache[playlistId] = {
      timestamp: now,
      data: response.data,
    };

    console.log(`[CACHE STORE] Cached data for playlist ${playlistId}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching YouTube playlist:", error);
    res.status(500).json({ error: "Failed to fetch YouTube playlist data" });
  }
};
