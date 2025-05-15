const axios = require("axios");
const { CACHE_TTL } = require("../utils/variables");

const cache = {
  videos: { data: null, timestamp: 0 },
  images: { data: null, timestamp: 0 },
};

exports.getCloudinaryVideos = async (req, res) => {
  const tag = "backgrounds";
  const now = Date.now();

  if (cache.videos.data && now - cache.videos.timestamp < CACHE_TTL) {
    console.log(`[CACHE Returning cached Cloudinary videos`);
    return res.json(cache.videos.data);
  }

  console.log(`[FETCH Fetching fresh Cloudinary videos`);
  try {
    const response = await axios.get(
      `https://res.cloudinary.com/${process.env.CLOUD_NAME}/video/list/${tag}.json`
    );

    cache.videos.data = response.data;
    cache.videos.timestamp = now;

    console.log(`[CACHE STORE] Cached Cloudinary videos`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Cloudinary videos:", error);
    res.status(500).json({ error: "Failed to fetch Cloudinary videos data" });
  }
};

exports.getCloudinaryImages = async (req, res) => {
  const tag = "wallpaper";
  const now = Date.now();

  if (cache.images.data && now - cache.images.timestamp < CACHE_TTL) {
    console.log(`[CACHE Returning cached Cloudinary images`);
    return res.json(cache.images.data);
  }

  console.log(`[FETCH Fetching fresh Cloudinary images`);
  try {
    const response = await axios.get(
      `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/list/${tag}.json`
    );

    cache.images.data = response.data;
    cache.images.timestamp = now;

    console.log(`[CACHE STORE Cached Cloudinary images`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Cloudinary images:", error);
    res.status(500).json({ error: "Failed to fetch Cloudinary images data" });
  }
};
