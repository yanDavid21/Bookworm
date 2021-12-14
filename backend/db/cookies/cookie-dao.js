const Cookie = require("./cookie-model")
const mongoose = require("mongoose")

const deleteCookie = (cookie) => Cookie.deleteOne({cookie: cookie})

const createCookie = (userId, cookie) => Cookie.create({cookie: cookie, user: mongoose.Types.ObjectId(userId)})

const findCookie = (userId) => Cookie.find({user: userId})

const findUser = (cookie) => Cookie.findOne({cookie: cookie})

const createOrUpdateCookie = (userId, hash, cb) => {
  Cookie.findOne({user: userId}, function (err, cookie) {
    if (cookie === null) {
      cb(Cookie.create({cookie: hash, user: userId}))
    } else {
      cb(Cookie.updateOne({user: userId}, {$set: {cookie: hash, user: userId}}))
    }
  })
}

module.exports = {
  deleteCookie,
  createCookie,
  findCookie,
  findUser,
  createOrUpdateCookie
}
