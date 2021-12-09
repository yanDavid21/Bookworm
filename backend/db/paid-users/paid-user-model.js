const mongoose = require('mongoose')
const schema = require('./paid-user-schema')
const bcrypt = require('bcrypt')

schema.methods.setPassword = function(password) {
  bcrypt.hash(password, 10, (err, hash) => {
    this.password = hash
  }) 
}

schema.methods.validatePassword = function(password, hash) {
  bcrypt.compare(password, hash, (err, response) => {
    return response
  })
}

const model = mongoose.model('PaidUser', schema)
module.exports = model