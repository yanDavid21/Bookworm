const Cookie = require("./cookie-model")

const deleteCookie = (cookie) => Cookie.deleteOne({cookie: cookie})

const createCookie = (userId, cookie) => Cookie.create({cookie: cookie, userId: userId})

const findCookie = (userId) => Cookie.find({user: userId})

module.exports = {
  deleteCookie,
  createCookie,
  findCookie
}
