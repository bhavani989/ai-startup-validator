const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema({
  title: String,
  description: String,
  report: Object
});

module.exports = mongoose.model("Idea", ideaSchema);