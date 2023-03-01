const mongoose = require("mongoose");
const shortid = require("shortid");

// const formattedDatetime = datetime.toLocaleString("en-IN", {
//   day: "numeric",
//   month: "long",
//   year: "numeric",
//   hour: "numeric",
//   minute: "numeric",
//   second: "numeric",
//   hour12: true,
// });

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
