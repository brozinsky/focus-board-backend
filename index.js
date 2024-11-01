const express = require("express");
const cors = require("cors");
require("dotenv").config();

const youtubeRoutes = require("./routes/youtubeRoutes");
const cloudinaryRoutes = require("./routes/cloudinaryRoutes");
const spotifyRoutes = require("./routes/spotifyRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use("/api/youtube", youtubeRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/spotify", spotifyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
