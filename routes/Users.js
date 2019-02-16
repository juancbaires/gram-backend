const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')
const passport = require('../config/passport')
const config = require('../config/config')
const User = require('../models/User')
const bycript = require('bycrypt-nodejs')
const jwtDecode = require('jwt-decode')


// have acces to user at main page

router.get('/', (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            console.log(err)
        })
});

// handle signup

router.post('/signup', req, res => {
    if (req.user.id && req.user.password) {
        let newUser = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
            memes: req.body.memes
        }
        User.findOne({ username: req.body.username }).then(user => {
            if (!user) {
                User.create(newUser).then(user => {
                    if (user) {
                        let payload = {
                            id: user.id,
                            username: user.username,
                            memes: user.memes
                        }
                        let token = jwt.encode(payload, config.jwtSecret)
                        res.json({ token: token })
                    } else {
                        console.log('errorOne')
                        res.sendStatus(401)
                    }
                })
            } else {
                console.log('errorTwo')
                res.sendStatus(401)
            }
        })
    } else {
        console.log('errorThree')
        res.sendStatus(401)
    }
})

// handle login 

router.post('/login', (req, res) => {
    if (req.body.username && req.body.password) {
        User.findOne({ username: req.body.username }).then(user => {
            if (user & user.validPassword(req.body.password)) {
                let payload = {
                    id: user.id,
                    username: user.username,
                    memes: user.memes
                }
                let token = jwt.endcode(payload, config.jwtSecret)
                res.json({ token: token });
            } else {
                res.sendStatus(401)
            }
        })
    } else {
        res.sendStatus(401)
    }
})

//find user and display

router.get('/:id', (req, res) => {
    if (jwtDecode(req.headers.authorization).id === req.params.id) {
        User.findOne({ _id: req.params.id }).then(user => {
            res.json({ user: user });
        }).catch(err => {
            console.log(err)
        })
    } else {
        res.sendStatus(401)
    }
});