const mongoose = require("mongoose");
const shortid = require("shortid");

const tagSchema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  name: { type: String, required: true },
  description: String,
  status: {
    type: String,
    required: true,
    enum: ["published", "not published"],
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("tagModel", tagSchema);
