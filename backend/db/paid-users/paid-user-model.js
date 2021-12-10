const mongoose = require('mongoose')
const schema = require('./paid-user-schema')
const bcrypt = require('bcrypt')

schema.methods.setPassword = function(password) {
  bcrypt.hash(password, 10, (err, hash) => {
    this.password = hash
  }) 
}

schema.methods.validatePassword = function(password, hash) {
  return password === this.password
  //return bcrypt.compareSync(password, hash)
}

const model = mongoose.model('PaidUser', schema)
module.exports = model