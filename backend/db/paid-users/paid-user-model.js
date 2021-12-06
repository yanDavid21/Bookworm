const mongoose = require('mongoose')
const schema = require('./paid-user-schema')
const model = mongoose.model('PaidUser', schema)
module.exports = model