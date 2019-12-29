const Schema = mongoose.Schema;
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//TODO * passwords
// const bcrypt = require('bcrypt-nodejs')

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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

// function to hash password before saving
User.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Generate auth token
User.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisisgram");
  user.token = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Find by credentials middleware to find user quicker
User.statics.FindByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Wrong paswords/unable to login");
  }

  return user;
};
module.exports = mongoose.model("User", User);
