const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const freeUserDao = require("../db/free-users/free-user-dao");
const paidUserDao = require("../db/paid-users/paid-user-dao");
const cookieDao = require("../db/cookies/cookie-dao");

router.post('/', function (req, res) {
  const token = req.body.token
  const password = req.body.enteredPassword


  cookieDao.findUser(token).then(userData => {
    if(userData === null) {
        res.status(409).send({
          message: "User could not be found: " + token
        })
    } else {
        const userId = userData.user;

        freeUserDao.findUserById(userId).then(freeUser => {
            if(freeUser === null) {
                paidUserDao.findUserById(userId).then(paidUser => {
                    paidUserDao.validateLogin(paidUser.email, password, function (validated) {
                        if(validated && password !== '') {
                            console.log('paid user validated!');
                            res.status(200).send({
                                message: "Password validated.",
                                validated: true,
                              })
                        } else {
                            res.status(403).send({
                                message: "Username and password not found.",
                                })
                        }
                    })
                })
            } else {
                freeUserDao.validateLogin(freeUser.email, password, function (validated) {
                    if(validated && password !== '') {
                        console.log('free user validated!');
                        res.status(200).send({
                            message: "Password validated.",
                            validated: true,
                          })
                    } else {
                        res.status(403).send({
                            message: "Username and password not found.",
                          })
                    }
                })
            }
        })
    }
  })
})

module.exports = router
