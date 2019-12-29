const User = require("../models/User");
require("mongoose");
const bcrypt = require("bcrypt-nodejs");

// post request to signup
exports.create = async function(req, res) {
  const user = new User();
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(404).send(error);
  }
};

// login function
exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

// logout function (out of current device)
exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

// logout of all devices erase all stored tokens
exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

// See users own profile
exports.getOwnProfile = async (req, res) => {
  res.send(req.user);
};

// this is found by ID. To see other profiles etc..
exports.GetUser = async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// User patch to udpate a user. Also using _id params
exports.updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "password"];
  const isValid = updates.every(update => {
    allowedUpdates.includes(updates.toLowerCase());
  });

  if (!isValid) {
    res.status(400).send({ error: "Invalid Updates" });
  }

  try {
    const user = await User.findById(req.params.id);

    updates.forEach(update => (user[update] = req.body[update]));

    await user.save();

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// delete user by ID

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
};
