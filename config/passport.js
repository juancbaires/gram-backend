const passport = require('passport')
const passporstJWT = require('passport-jwt')
const ExtractJwt = passporstJWT.ExtractJwt
const Strategy = passporstJWT.Strategy
const config = require('./config')


const User = require('../models/User')

const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = () => {
    let strategy = new Strategy(params, (payload, callback) => {
        let user = User.findById(payload.findById) || null

        if (user) {
            return callback(null, { id: user.id })

        } else {
            return callback(new Error('User not found!', null))
        }
    })

    passport.use(strategy)

    return {
        initialize: function () {
            return passport.initialize()
        },
        authenticate: function () {
            return passport.authenticate('jwt', { session: false })
        }
    }
}