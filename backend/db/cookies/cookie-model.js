const mongoose = require('mongoose')
const schema = require('./cookie-schema')
const model = mongoose.model('Cookie', schema)
module.exports = model
