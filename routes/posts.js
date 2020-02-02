const express = require("express");
const Router = new express.Router();
const auth = require("../middleware/auth");
const postController = require("../controllers/postController");

Router.post("/new-post", auth, postController.create);
Router.get("/single-post", auth, postController.getSinglePost);
Router.patch("/:id", auth, postController.updatePost);
Router.delete("/:id", auth, postController.deletePost);

module.exports = Router;
