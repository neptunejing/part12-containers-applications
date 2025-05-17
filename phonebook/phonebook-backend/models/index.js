const mongoose = require("mongoose");
const { MONGO_URL } = require("../util/config");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
