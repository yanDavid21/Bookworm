const mongoose = require('mongoose')
const { Schema } = mongoose

const bookSchema = new Schema({
  title: String,
  author: String,
  genre: String,
  description: String,
  published: Date,
  pages: Number
  // if we are using friends, then friend list goes here
})

module.exports = bookSchema