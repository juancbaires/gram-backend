const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;
const Comment = require("./Comment");

const Post = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  time: { type: Date, default: Date.now },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  img: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

module.exports = mongoose.model("Post", Post);
