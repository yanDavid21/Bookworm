const mongoose = require('mongoose')
const schema = require('./author-schema')
const model = mongoose.model('Author', schema)
module.exports = model