const axios = require("axios");

exports.getCloudinaryVideos = async (req, res) => {
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
};

exports.getCloudinaryImages = async (req, res) => {
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
};
