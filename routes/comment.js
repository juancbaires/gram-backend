const auth = require("../middleware/auth");
const commentController = require("../controllers/commentController");
const express = require("express");
const Router = new express.Router();
/** routes fot the comment controller */

Router.post("/creat-comment", auth, commentController.createComment);

module.exports = Routers;
