const User = require('../models/User')
require('mongoose')

// post request to login
exports.create = function (req, res) {
    const user = new User(req.body)
    user.save().then(() => {
        res.send(user);
    }).catch(err => {
        console.log(err);
    }
    )
}

// index the home page make every user available 

exports.index = (req, res) => {
    User.find({}).then((users) => {
        res.json(users);
    }).catch(err => {
        res.status(400).send('Unable to load home page. Please try again!')
    })
}