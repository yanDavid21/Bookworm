const express = require("express");
const router = express.Router();
const cookieDao = require("../db/cookies/cookie-dao");

router.post('/', function (req, res) {
  // CHANGE THIS LINE IF YOU NEED TO
  const token = req.headers.tk
  
  cookieDao.deleteCookie(token)
  res.send({
    message: "logged out."
  })
})


module.exports = router; 