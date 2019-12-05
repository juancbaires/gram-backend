const express = require('express')
const Router = express.Router()

const userController = require('../controllers/userController')


Router.post('/signup', userController.create)
Router.get('/', userController.index)


module.exports = Router