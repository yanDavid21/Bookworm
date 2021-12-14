const Cookie = require("./cookie-model")
const mongoose = require("mongoose")

const deleteCookie = (cookie) => Cookie.deleteOne({cookie: cookie})

const createCookie = (userId, cookie) => Cookie.create({cookie: cookie, user: mongoose.Types.ObjectId(userId)})

const findCookie = (userId) => Cookie.find({user: userId})

const findUser = (cookie) => Cookie.findOne({cookie: cookie})

const createOrUpdateCookie = (userId, hash, cb) => {
  console.log("IN CREATE OR UPDATE COOKIE")
  console.log("user id: " + userId)
  console.log("hash: " + hash)
  Cookie.findOne({user: userId}, function (err, cookie) {
    console.log("ERROR: " + err)
    console.log("COOKIE: " + cookie)
    if (cookie === null) {
      console.log("COOKIE IS NULL")
      cb(Cookie.create({cookie: hash, user: userId}))
    } else {
      console.log("GOT HERE")
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
