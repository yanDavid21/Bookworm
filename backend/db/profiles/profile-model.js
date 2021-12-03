const mongoose = require('mongoose')
const schema = require('./profile-schema')
const model = mongoose.model('Profile', schema)
module.exports = model