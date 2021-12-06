const mongoose = require('mongoose')
const { Schema } = mongoose

const freeUserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  to_read: [],
  in_progress: [],
  finished: [],
})

module.exports = freeUserSchema