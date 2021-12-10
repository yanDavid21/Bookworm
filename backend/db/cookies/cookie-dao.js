const Cookie = require("./cookie-model")
const mongoose = require("mongoose")

const deleteCookie = (cookie) => Cookie.deleteOne({cookie: cookie})

const createCookie = (userId, cookie) => Cookie.create({cookie: cookie, user: mongoose.Types.ObjectId(userId)})

const findCookie = (userId) => Cookie.find({user: userId})

const findUser = (cookie) => Cookie.findOne({cookie: cookie})

module.exports = {
  deleteCookie,
  createCookie,
  findCookie,
  findUser
}
