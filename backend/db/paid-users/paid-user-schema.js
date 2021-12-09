const mongoose = require('mongoose')
const { Schema } = mongoose

const paidUserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  to_read: [Schema.Types.ObjectId],
  in_progress: [Schema.Types.ObjectId],
  finished: [Schema.Types.ObjectId],
  friends: [Schema.Types.ObjectId],
})

module.exports = paidUserSchema