const mongoose = require('mongoose')
const { Schema } = mongoose

const paidUserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  to_read: [Schema.Types.String],
  in_progress: [Schema.Types.String],
  finished: [Schema.Types.String],
  friends: [Schema.Types.ObjectId],
})

module.exports = paidUserSchema