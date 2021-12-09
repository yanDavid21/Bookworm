const mongoose = require('mongoose')
const { Schema } = mongoose

const bookSchema = new Schema({
  title: String,
  author: String,
  genre: String,
  description: String,
  published: Date,
  pages: Number,
  toReadUsers: [Schema.Types.ObjectId],
  inProgressUsers: [Schema.Types.ObjectId],
  finishedUsers: [Schema.Types.ObjectId]
})

module.exports = bookSchema