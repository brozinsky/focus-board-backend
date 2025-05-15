const axios = require("axios");
const { getSpotifyAccessToken } = require("../auth/spotifyAuth");
const { CACHE_TTL } = require("../utils/variables");

/** @type {{ playlists: any[] | null, timestamp: number | null }} */
const cache = {
  playlists: null,
  timestamp: null,
};

exports.getSpotifyPlaylists = async (req, res) => {
  try {
    const now = Date.now();
    if (
      cache.playlists &&
      cache.timestamp &&
      now - cache.timestamp < CACHE_TTL
    ) {
      return res.json(cache.playlists);
    }

    console.log("[FETCH] Fetching fresh Spotify playlists");

    const accessToken = await getSpotifyAccessToken();

    const playlistResponse = await axios.get(
      `https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_ID}/playlists`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    cache.playlists = playlistResponse.data.items;
    cache.timestamp = now;

    console.log(`[CACHE STORE] Cached data for spotify playlists`);
    res.json(cache.playlists);
  } catch (error) {
    console.error("Error fetching Spotify playlists:", error);
    res.status(500).json({ error: "Failed to fetch Spotify playlist data" });
  }
};
