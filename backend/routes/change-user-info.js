const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const freeUserDao = require("../db/free-users/free-user-dao")
const paidUserDao = require("../db/paid-users/paid-user-dao")
const cookieDao = require("../db/cookies/cookie-dao")

router.post('/', function (req, res) {
  const newName = req.body.newName;
  const newEmail = req.body.newEmail;
  const newPassword = req.body.newPassword;
  const token = req.body.token;

  cookieDao.findUser(token)
  .then(userData => {
    if(userData === null) {
        res.status(409).send({
          message: "User could not be found: " + token
        })
    } else {
        const userId = userData.user;
        freeUserDao.findUserById(userId).then(freeUser => {
            if(freeUser === null) {
                paidUserDao.findUserById(userId).then(paidUser => {
                    // update paid user
                    paidUser.name = (newName === "") ? paidUser.name : newName;
                    paidUser.email = (newEmail === "") ? paidUser.email : newEmail; 
                    paidUser.password = (newPassword === "") ? paidUser.password : bcrypt.hashSync(newPassword, 10)

                    paidUserDao.updateUser(userId, paidUser, res).then(status => {
                        res.status(200).send({
                            message: "Updated user - new email: " + newEmail + ", new name: " + newName,
                            newEmail: newEmail,
                            newName: newName,
                        })
                    })
                })
            } else {
                // update free user
                freeUser.name = (newName === "") ? freeUser.name : newName;
                freeUser.email = (newEmail === "") ? freeUser.email : newEmail; 
                freeUser.password = (newPassword === "") ? freeUser.password : bcrypt.hashSync(newPassword, 10)

                freeUserDao.updateUser(userId, freeUser, res).then(status => {
                    res.status(200).send({
                        message: "Updated user - new email: " + newEmail + ", new name: " + newName,
                        newEmail: newEmail,
                        newName: newName,
                    })
                })
            }
        })
    }
  })
})

module.exports = router;
