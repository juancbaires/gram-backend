const Post = require("../models/Post");

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

exports.getPosts = async (req, res) => {
  try {
    await req.user.populte("posts").execPopulate();
    res.status(200).send(req.user.posts);
  } catch (error) {
    res.send(500).send(error.message);
  }
};
