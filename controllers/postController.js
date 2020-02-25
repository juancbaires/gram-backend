const Post = require("../models/Post");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv").config(__dirname, "../.env");

cloudinary.config({
  cloud_name: "juansito",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// createt a post
// works on postman and creates adds user id to it.
exports.create = async (req, res) => {
  cloudinary.uploader.upload(req.files.image.path, async function(result) {
    const post = new Post({
      ...req.body,
      owner: req.user._id,
      img: result.url,
      imgID: result.public_id
    });
    try {
      await post.save();
      res.status(201).send(post);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });
};

// requires auth middleware
// Get all posts to a single user
// tested in postman and retrieves all post that belong the current user.
exports.getPosts = async (req, res) => {
  try {
    ("hitting here again???!!");
    await req.user.populate("posts").execPopulate();
    res.status(200).send(req.user.posts);
  } catch (error) {
    res.status(500).send();
  }
};
// Get a single post from a user
// requires auth middleware
// Tested and function with id, returns error for wrong id in postman
exports.getSinglePost = async (req, res) => {
  console.log("hitting the right function");
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
// this successfully works on postman and updates based on user id, post id and allowed possible updates
exports.updatePost = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["content", "img", "comments"];
  const isValid = updates.every(update => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(404).send({ error: "invalid update!" });
  }
  const _id = req.params.id;
  try {
    const post = await Post.findOne({ _id, owner: req.user._id });
    updates.forEach(update => (post[update] = req.body[update]));
    await post.save();
    res.send(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// delete a post
// requires auth middleware
// Works on post man with bearer token.
exports.deletePost = async (req, res) => {
  const _id = req.params.id;
  try {
    const post = await Post.findOne({ _id, owner: req.user._id });
    console.log(post);
    if (!post) {
      res.status(404).send();
    }
    post.remove();
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.allpostHome = async (req, res) => {
  const posts = await Post.find({}).populate("comments");
  // posts.populate("comments").execPopulate();
  try {
    if (posts) {
      res.send(posts);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};
