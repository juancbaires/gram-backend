const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;
const User = require("./User");

const Comment = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  username: String,
  content: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", Comment);
