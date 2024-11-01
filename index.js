const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.get("/api/youtube", async (req, res) => {
  try {
    const YT_BASE_URL = "https://www.googleapis.com/youtube/v3/playlistItems";
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
});

app.get("/api/cloudinary-videos", async (req, res) => {
  const tag = "backgrounds";
  try {
    const response = await axios.get(
      `https://res.cloudinary.com/${process.env.CLOUD_NAME}/video/list/${tag}.json`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Cloudinary videos:", error);
    res.status(500).json({ error: "Failed to fetch Cloudinary videos data" });
  }
});

app.get("/api/cloudinary-images", async (req, res) => {
  const tag = "wallpaper";
  try {
    const response = await axios.get(
      `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/list/${tag}.json`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Cloudinary images:", error);
    res.status(500).json({ error: "Failed to fetch Cloudinary images data" });
  }
});

app.get("/api/spotify-playlist", async (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const authString = btoa(`${clientId}:${clientSecret}`);

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${authString}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

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
});

app.get("/api/spotify-player", async (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const authString = btoa(`${clientId}:${clientSecret}`);

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${authString}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const playlistResponse = await axios.get(
      `https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_ID}/playlists`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return playlistResponse.data.items;
  } catch (error) {
    console.error("Error fetching Spotify player:", error);
    res.status(500).json({ error: "Failed to fetch Spotify player data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
