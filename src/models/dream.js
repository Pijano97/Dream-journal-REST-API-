const mongoose = require("mongoose");

const dreamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    // trim?
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    require: true,
  },
  dream: {
    type: String,
    enum: ["happy", "sad", "exciting", "scary"],
  },
});

const Dream = mongoose.model("Dream", dreamSchema);

module.exports = Dream;
