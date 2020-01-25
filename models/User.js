const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// add a virtual attribute
userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "owner"
});

/** change the user object that is returned to protect user privacy */
User.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();

  // NOTE: remove fields that I dont want inlcuded in user object.

  delete userObj.password;
  delete userObj.tokens;

  return userObj;
};

// Find by credentials middleware to find user quicker
User.statics.findByCredentials = async (username, password) => {
  const user = await mongoose.model("User").findOne({ username: username });
  if (!user) {
    throw new Error("unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Wrong paswords/unable to login");
  }

  return user;
};
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

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

module.exports = mongoose.model("User", User);
