const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema
const User = require('./User')

const Comment = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    date: Date,
})


module.exports = mongoose.model('Comment', Comment)