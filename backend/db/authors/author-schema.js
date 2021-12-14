const mongoose = require('mongoose')
const { Schema } = mongoose

const authorSchema = new Schema({
  name: String,
  books: [String]
})

module.exports = authorSchema