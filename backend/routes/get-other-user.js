const express = require("express");
const router = express.Router();
const freeUserDao = require("../db/free-users/free-user-dao");
const paidUserDao = require("../db/paid-users/paid-user-dao");

router.post('/', function (req, res) {
  const userId = req.body.userId;
  console.log(userId);

  freeUserDao.findUserById(userId).then(freeUser => {
      if(freeUser === null) {
          paidUserDao.findUserById(userId).then(paidUser => {
              res.send(paidUser);
          })
      } else {
          res.send(freeUser);
      }
  })

//   cookieDao.findUser(token)
//   .then(userData => {
//     if(userData === null) {
//       res.status(409).send({
//         message: "User could not be found: " + token
//       })
//     } else {
//       freeUserDao.findUserById(userData.user).then(freeUser => {
//         if(freeUser === null) {
//           paidUserDao.findUserById(userData.user).then(paidUser => {
//             res.send(paidUser); 
//           })
//         } else {
//           res.send(freeUser);
//         }
//       })
//     }
//   });
})

module.exports = router;
