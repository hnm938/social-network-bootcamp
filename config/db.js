const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/myapp";

mongoose.connect(MONGODB_URI, {
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

module.exports = db;
