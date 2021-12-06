const mongoose = require('mongoose')
const { Schema } = mongoose

const authorSchema = new Schema({
  name: String,
  books: [Schema.Types.ObjectId]
})

module.exports = authorSchema