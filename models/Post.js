const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema
const Comment = require('./Comment')


const Post = new mongoose.Schema({
    content: String,
    timeStamp: Date,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    img: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})



module.exports = mongoose.model('Post', Post)