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
  dream: {
    required: false,
    happy: Boolean,
    sad: Boolean,
    exciting: Boolean,
    scary: Boolean,
  },
});

const Dream = mongoose.model("Dream", dreamSchema);

module.exports = Dream;
