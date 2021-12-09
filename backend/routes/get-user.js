const express = require("express");
const router = express.Router();
const freeUserDao = require("../db/free-users/free-user-dao");
const paidUserDao = require("../db/paid-users/paid-user-dao");

router.post("/", function (req, res) {
  const header = req.headers;

  let dao = freeUserDao;
  if (userType === "Premium") {
    dao = paidUserDao;
  }
  // check that a user with the same email doesn't exist in the database
  if (dao.findUserByEmail().length() === 1) {
    // Tell the frontend that there is already a user with that email
    res.status(409).send({
      message: "User with the inputted email already exists.",
    });
  } else {
    user = {
      name: name,
      email: email,
      to_read: [],
      in_progress: [],
      finished: [],
    };
    dao.createUser(user, password);
    res.status(201).send({
      message: "New user with email " + email + " created.",
    });
  }
});

module.exports = router;
