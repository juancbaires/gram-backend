const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema
//TODO * passwords
// const bcrypt = require('bcrypt-nodejs')

const User = new mongoose.Schema({
    username: String,
    password: String,
    memes: []
})


module.exports = mongoose.model('User', User)
