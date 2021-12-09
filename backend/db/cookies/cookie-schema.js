const mongoose = require("mongoose")
const { Schema } = mongoose

const cookieSchema = new Schema({
  cookie: String,
  user: Schema.Types.ObjectId
})

module.exports = cookieSchema