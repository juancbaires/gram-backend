const express = require("express");
const Router = new express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");

Router.post("/signup", userController.create);
Router.post("/login", userController.login);
Router.post("/logout", auth, userController.logout);
Router.patch("/:id", auth, userController.updateUser);
Router.delete("/:id", auth, userController.deleteUser);

module.exports = Router;
