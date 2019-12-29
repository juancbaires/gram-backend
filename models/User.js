const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;
const validator = require("validator");

//TODO * passwords
// const bcrypt = require('bcrypt-nodejs')

const User = new mongoose.Schema({
  username: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    validate(value) {
      if (validator.contains(value.toLowerCase(), "password")) {
        throw new Error("Password cannot contain 'password'!");
      }
    }
  },

  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("User", User);
