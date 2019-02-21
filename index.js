const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const UsersRoutes = require('./routes/Users')
const cors = require('cors')
const passport = require('./config/passport')()

app.set('port', process.env.PORT || 4006)
app.use(bodyParser.json());
app.use(cors())

//PASSPORT STUFF

require('./config/passport')(passport)
app.use(passport.initialize())

app.use(function (req, res, next) {
    res.locals.currentUser = req.user
    next()
})

app.use('/users', UsersRoutes)

app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'))
})
