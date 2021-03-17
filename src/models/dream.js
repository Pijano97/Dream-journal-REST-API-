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
    type: Date,
    require: true,
  },
  dream: {
    type: String,
    enum: ["happy", "sad", "exciting", "scary"],
  },
});

const Dream = mongoose.model("Dreams", dreamSchema);

const dreamTypes = ["happy", "sad", "exciting", "scary"];

// module.exports = dreamTypes;
// module.exports = Dream;
module.exports = { Dream, dreamTypes };
