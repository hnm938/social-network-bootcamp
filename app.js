const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB database");
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

const userRoutes = require("./routes/user-routes");
const thoughtRoutes = require("./routes/thought-routes");
const reactionRoutes = require("./routes/reaction-routes");

// Use the routes in your application
app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);
app.use("/api/thoughts/:thoughtId/reactions", reactionRoutes);

// Start the Express server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
