const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const cors = require('cors')

app.set('port', process.env.PORT || 3001)
app.use(bodyParser.json());
app.use(cors())


app.get('/', (req, res) => res.send('Hello World!'))


app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'))
})
