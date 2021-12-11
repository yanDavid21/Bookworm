const express = require("express");
const router = express.Router();
const cookieDao = require("../db/cookies/cookie-dao");

router.post('/', function (req, res) {
  // CHANGE THIS LINE IF YOU NEED TO
  const token = req.body.token

  console.log(token)
  
  cookieDao.deleteCookie(token).then((status) => {
    res.send({
      message: "logged out."
    })
  })
})


module.exports = router;
