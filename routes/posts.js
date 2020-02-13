const express = require("express");
const Router = new express.Router();
const auth = require("../middleware/auth");
const postController = require("../controllers/postController");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

Router.post("/new-post", auth, multipartMiddleware, postController.create);
Router.get("/allofposts", postController.allpostHome);
Router.get("/allposts", auth, postController.getPosts);
Router.get("/:id", auth, postController.getSinglePost);
Router.patch("/:id", auth, postController.updatePost);
Router.delete("/:id", auth, postController.deletePost);

module.exports = Router;
