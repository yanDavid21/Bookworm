const express = require("express")
const router = express.Router()
const bookDao = require("../db/books/book-dao")
const cookieDao = require("../db/cookies/cookie-dao")
const freeUserDao = require("../db/free-users/free-user-dao")
const paidUserDao = require("../db/paid-users/paid-user-dao")

const getReadingList = (user, res) => {
  bookDao.findBooksByIsbn(user.to_read).then(books => {
    res.status(200).json(books)
  })
}

router.post('/', function (req, res) {
  token = req.body.token
  cookieDao.findUser(token).then(userData => {
    if (userData === null) {
      res.status(409).send({
        message: "User could not be found: " + token
      })
    } else {
      freeUserDao.findUserById(userData.user).then(freeUser => {
        if (freeUser == null) {
          paidUserDao.findUserById(userData.user).then(paidUser => {
            getReadingList(paidUser, res)
          })
        } else {
          getReadingList(freeUser, res)
        }
      })
    }
  })
})

module.exports = router
