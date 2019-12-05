const User = require('../models/User')
const Comment = require('../models/Comment')
const Post = require('../models/Post')
const mongoose = require('mongoose')

// User.find({}).remove(() => {
//     const juan = User.create({
//         username: 'juan',
//         password: 'juan',
//     }).then(user => {
//         console.log('saved', user)
//     }).catch(err => console.log())
// })

Post.find({}).remove(() => {
    let post = Post.create({
        content: 'This is the post content, like facebook post!',
        Date: Date.now(),
        author: '5de661a49244ef142d95d08d',
        img: 'String.jpeg',
    }).then((item) => {
        console.log(item, 'ITEM')
    }).catch(error => console.log('Seed Error', error))
})


Comment.find({}).remove(() => {
    let comment = Comment.create({
        author: '5de661a49244ef142d95d08d',
        content: "this is the comment!",
        Date: Date.now(),
    }).then((com) => {
        console.log(com)
    }).catch(err => console.log(err))
})