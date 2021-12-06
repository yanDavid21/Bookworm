const mongoose = require('mongoose')
const { Schema } = mongoose

const paidUserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  to_read: [],
  in_progress: [],
  finished: [],
  friends: []
})

module.exports = paidUserSchema