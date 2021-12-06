const mongoose = require('mongoose')
const { Schema } = mongoose

const profileSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String
})

module.exports = profileSchema