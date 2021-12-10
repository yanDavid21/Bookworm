const mongoose = require('mongoose')
const schema = require('./free-user-schema')
const bcrypt = require('bcrypt')

schema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, 10)
}

schema.methods.validatePassword = function(password, hash) {
  // return bcrypt.compareSync(password, hash)
  return true
}

const model = mongoose.model('FreeUser', schema)
module.exports = model