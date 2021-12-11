const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const freeUserDao = require("../db/free-users/free-user-dao")
const paidUserDao = require("../db/paid-users/paid-user-dao")
const cookieDao = require("../db/cookies/cookie-dao")

router.post('/', function (req, res) {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  const userType = req.body.userType

  let dao = freeUserDao
  if (userType === "premium") {
    dao = paidUserDao
  }

  freeUserDao.findUserByEmail(email).then(user => {
    if(user !== null) {
      res.status(409).send({
        message: "User with the inputted email already exists."
      })
    } else {
      paidUserDao.findUserByEmail(email).then(user => {
        if (user !== null) {
          res.status(409).send({
            message: "User with the inputted email already exists."
          })
        } else {
          const userId = new mongoose.Types.ObjectId()
          userObj = {
            _id: userId,
            name: name,
            email: email,
            to_read: [],
            in_progress: [],
            finished: []
          }
          dao.createUser(userObj, password)
          const hashString = email + password + Date.now()
          bcrypt.hash(hashString, 10, function (err, hash) {
            cookieDao.createCookie(userId.toString(), hash)
            res.status(200).send({
              message: "New user with email " + email + " created",
              token: hash,
            })
          })
        }
      })
    }
  })
})

module.exports = router;
