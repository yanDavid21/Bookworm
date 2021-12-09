const mongoose = require('mongoose')
const schema = require('./book-schema')
const model = mongoose.model('Book', schema)
module.exports = model