const User = require('../models/User')
require('mongoose')
const jwt = require('jwt-simple')
const passport = require('../auth/passport')
const config = require('../auth/config')
const bcrypt = require('bcrypt-nodejs')
const jwtDecode = require('jwt-decode')

// post request to signup
exports.create = async function (req, res) {
    try {
        const AlreadyExists = await User.find({ username: req.body.username })
        if (AlreadyExists.length === 0) {
            const user = new User({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
            })
            await user.save()
            let payload = {
                username: user.username,
                posts: user.posts
            }
            const token = jwt.encode(payload, config.jwtSecret)
            res.status(201).send('User created', { token })
        } else {
            return res.status(404).send('Username already taken! Try again with different username');
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// index the home page make every user available 
exports.index = (req, res) => {
    User.find({}).then((users) => {
        res.json(users);
    }).catch(err => {
        res.status(400).send('Unable to load home page. Please try again!')
    })
}


exports.login = async (req, res) => {
    if (req.body.username && req.body.password) {
        try {
            const user = await User.findOne({ username: req.body.username })
            console.log(user)
            if (user.validPassword(req.body.password)) {
                let payload = {
                    username: user.username,
                    posts: user.posts
                }
                const token = jwt.encode(payload, config.jwtSecret)
                res.send({ token });
            } else {
                res.status(404).send('Try another password/username');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    } else {
        return send.status(404).send({ error: 'Username and password are required fields!' })
    }
}