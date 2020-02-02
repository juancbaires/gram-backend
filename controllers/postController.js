const Post = require("../models/Post");
const mongoose = require("mongoose");

// createt a post
exports.create = async (req, res) => {
  const post = new Post({
    ...req.body,
    owner: req.user._id
  });
  try {
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send();
  }
};

// requires auth middleware
// Get all posts to a single user
exports.getPosts = async (req, res) => {
  try {
    await req.user.populte("posts").execPopulate();
    res.status(200).send(req.user.posts);
  } catch (error) {
    res.send(500).send(error.message);
  }
};
// Get a single post from a user
// requires auth middleware
exports.getSinglePost = async (req, res) => {
  const _id = req.params.id;
  try {
    const post = await Post.findOne({ _id, owner: req.user._id });
    if (!post) {
      return res.status(404).send("Task unavailable!");
    }
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// update a single post
// requires auth middleware
exports.updatePost = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["content", "timeStamp", "img", "comments"];
  const isValid = updates.every(update => {
    allowedUpdates.includes(update);
  });

  if (!isValid) {
    return res.status(404).send({ error: "invalid update!" });
  }

  try {
    const _id = req.params.id;
    const post = await Post.findOne({ _id, owner: req.user._id });
    updates.forEach(udpate => (post[update] = req.body[update]));
    await post.save;
    res.send(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// delete a post
// requires auth middleware

exports.deletePost = async (req, res) => {
  const _id = req.params._id;
  try {
    const post = await Post.findOne({ _id, owner: req.user._id });
    if (!post) {
      res.status(404).send("post not found");
    }
    post.remove();
    res.status(200).send("post was deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
