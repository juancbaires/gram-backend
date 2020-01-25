const express = require("express");
const Router = new express.Router();
const auth = require("../middleware/auth");
const postController = require("../controllers/postController");

module.exports = Router;
