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
      freeUserDao.findUserById(userData.user).then(freeUser => {
        if(freeUser === null) {
          paidUserDao.findUserById(userData.user).then(paidUser => {
            paidUserObject = paidUser.toObject();
            paidUserObject.userType = 'paid'
            res.send(paidUserObject);
          })
        } else {
          freeUserObject = freeUser.toObject();
          freeUserObject.userType = 'free'
          res.send(freeUserObject);
        }
      })
    }
  });
})

module.exports = router;
