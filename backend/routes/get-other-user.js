const express = require("express");
const router = express.Router();
const freeUserDao = require("../db/free-users/free-user-dao");
const paidUserDao = require("../db/paid-users/paid-user-dao");

router.post('/', function (req, res) {
  const userId = req.body.userId;

  freeUserDao.findUserById(userId).then(freeUser => {
      if(freeUser === null) {
          paidUserDao.findUserById(userId).then(paidUser => {
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
})

module.exports = router;
