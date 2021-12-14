const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const freeUserDao = require("../db/free-users/free-user-dao");
const paidUserDao = require("../db/paid-users/paid-user-dao");
const cookieDao = require("../db/cookies/cookie-dao");

router.post('/', function (req, res) {
  const email = req.body.email
  const password = req.body.password

  freeUserDao.validateLogin(email, password, function (validated) {
    if (validated) {
      freeUserDao.findUserByEmail(email).then(user => {
        const userId = user.id
        // success!!
        // generate a new cookie
        const hashString = email + password + Date.now()
        bcrypt.hash(hashString, 10, function (err, hash) {
          cookieDao.createOrUpdateCookie(userId, hash, function (promise) {
            promise.then(cookie => {
              res.status(200).send({
                message: "Login successful.",
                token: hash,
                userType: 'free'
              })
            })
          })
        })

      })
    } else {
      paidUserDao.validateLogin(email, password, function (validated) {
        if (validated) {
          paidUserDao.findUserByEmail(email).then(user => {
            const userId = user.id
            // success!!
            // generate a new cookie
            const hashString = email + password + Date.now()
            bcrypt.hash(hashString, 10, function (err, hash) {
              cookieDao.createOrUpdateCookie(userId, hash, function (promise) {
                promise.then(cookie => {
                  res.status(200).send({
                    message: "Login successful.",
                    token: hash,
                    userType: 'paid'
                  })
                })
              })
            })
    
          })
        } else {
          res.status(403).send({
            message: "Username and password not found.",
          })
        }
      })
    }
  })

})

module.exports = router
