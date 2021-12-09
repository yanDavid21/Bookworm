const mongoose = require('mongoose')
const schema = require('./free-user-schema')
const bcrypt = require('bcrypt')

schema.methods.setPassword = function(password) {
  bcrypt.hash(password, 10, (err, hash) => {
    this.password = hash
  }) 
}

schema.methods.validPassword = function(password, hash) {
  bcrypt.compare(password, hash, (err, response) => {
    return response
  })
}

const model = mongoose.model('FreeUser', schema)
module.exports = model