const mongoose = require('mongoose')
const { Schema } = mongoose

const bookSchema = new Schema({
  isbn: String,
  title: String,
  authors: [String],
  description: String,
  publishedDate: String,
  publisher: String,
  addedCount: Number, 
  image: String
})

module.exports = bookSchema