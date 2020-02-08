const auth = require("../middleware/auth");
const commentController = require("../controllers/commentController");
const express = require("express");
const Router = new express.Router();
/** routes fot the comment controller */

// this will have the ID of the post to update
Router.post("/create-comment/:id", auth, commentController.createComment);

module.exports = Router;
