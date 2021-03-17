const mongoose = require("mongoose");

const dreamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    require: true,
  },
  dream: {
    type: String,
    required: true,
    enum: ["happy", "sad", "exciting", "scary"],
  },
});

const Dream = mongoose.model("Dreams", dreamSchema);

const dreamTypes = ["happy", "sad", "exciting", "scary"];

// module.exports = dreamTypes;
// module.exports = Dream;
module.exports = { Dream, dreamTypes };
