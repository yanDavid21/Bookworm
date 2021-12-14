const express = require("express");
const router = express.Router();
const cookieDao = require('../db/cookies/cookie-dao');
const freeUserDao = require("../db/free-users/free-user-dao");
const paidUserDao = require("../db/paid-users/paid-user-dao");

router.post('/', function (req, res) {
  const token = req.body.token;

  cookieDao.findUser(token)
  .then(userData => {
    if(userData === null) {
      res.status(409).send({
        message: "User could not be found: " + token
      })
    } else {
      console.log('id: ' + userData.user);
      freeUserDao.findUserById(userData.user).then(freeUser => {
        if(freeUser === null) {
          paidUserDao.findUserById(userData.user).then(paidUser => {
            paidUser.userType = 'paid'
            res.send(paidUser);
          })
        } else {
          freeUser.userType = 'free'
          res.send(freeUser);
        }
      })
    }
  });
})

module.exports = router;
