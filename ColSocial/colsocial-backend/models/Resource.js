const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  creatorName: { type: String, required: true },
});

module.exports = mongoose.model("Resource", resourceSchema);
