const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const UsersRoutes = './routes/Users'
const cors = require('cors')

app.set('port', process.env.PORT || 3001)
app.use(bodyParser.json());
app.use(cors())


app.use(function (req, res, next) {
    res.locals.currentUser = req.user
    next()
})

app.use('/users', UsersRoutes)

app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'))
})
