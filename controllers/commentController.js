const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");

// edit a post by Id, add the author the comment and then add update the post.
exports.createComment = async (req, res) => {
  console.log("hit this comment function");
  const _id = req.params.id;
  try {
    const post = await Post.findById({ _id });
    const comment = await Comment.create({
      ...req.body,
      author: req.user._id,
      username: req.user.username
    });
    if (!post) {
      return res.status(500).send();
    }
    comment.save();
    post.comments.push(comment);
    post.save();
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
