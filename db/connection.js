const mongoose = require('mongoose')

if (process.env.NODE_ENV === 'production') {
    mongoose.connect(process.env.MLAB_URL)
} else {
    mongoose.connect('mongodb://localhost/gram-backend', { useNewUrlParser: true, useUnifiedTopology: true })
}

module.exports = mongoose
