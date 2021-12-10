const mongoose = require('mongoose')
const schema = require('./paid-user-schema')
const bcrypt = require('bcrypt')

schema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, 10)
}

schema.methods.validatePassword = function(password, hash) {
  return bcrypt.compareSync(password, hash)
}

const model = mongoose.model('PaidUser', schema)
module.exports = model