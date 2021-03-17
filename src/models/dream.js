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
    happy: Boolean,
    sad: Boolean,
    exciting: Boolean,
    scary: Boolean,
  },
});
