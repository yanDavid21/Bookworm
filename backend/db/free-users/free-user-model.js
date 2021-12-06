const mongoose = require('mongoose')
const schema = require('./free-user-schema')
const model = mongoose.model('FreeUser', schema)
module.exports = model