const axios = require("axios");
const { getSpotifyAccessToken } = require("../auth/spotifyAuth");

exports.getSpotifyPlaylists = async (req, res) => {
  try {
    const accessToken = await getSpotifyAccessToken();

    const playlistResponse = await axios.get(
      `https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_ID}/playlists`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(playlistResponse.data.items);
  } catch (error) {
    console.error("Error fetching Spotify playlists:", error);
    res.status(500).json({ error: "Failed to fetch Spotify playlist data" });
  }
};
