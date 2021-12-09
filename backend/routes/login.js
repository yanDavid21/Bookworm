const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const freeUserDao = require("../db/free-users/free-user-dao");
const paidUserDao = require("../db/paid-users/paid-user-dao");
const cookieDao = require("../db/cookies/cookie-dao");

router.post('/', function (req, res) {
  const email = req.body.email
  const password = req.body.password

  if (freeUserDao.validateLogin(email, password) || paidUserDao.validateLogin(email, password)) {
    // success!!

    // first figure out which user we are dealing with
    let users = freeUserDao.findUserByEmail(email)
    let user = null
    if (users.length() === 0) {
      user = paidUserDao.findUserByEmail(email)[0]
    } else {
      user = users[0]
    }
    userId = user.id

    // generate a new cookie
    const hashString = email + password + Date.now()
    const token = bcrypt.hash(hashString, 10)

    cookieDao.createCookie(new ObjectId(userId), cookie)

    res.status(200).send({
      message: "Login successful.",
      token: token,
    })
  } else {
    res.status(403).send({
      message: "Incorrect email or password."
    })
  }

})

module.exports = router
