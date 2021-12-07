const express = require("express");
const router = express.Router();
const axios = require("axios");

const searchAPI = "https://www.googleapis.com/books/v1/volumes";
const APIKEY = `:keyes&key=AIzaSyCW29m4Tkp1NtCdM2jWzvqP9n-gjyO7Wl0`;

/* GET users listing. */
router.get("/", function (req, res, next) {
  const query = req.query.q;
  const searchType = req.query.searchType;
  axios({
    method: "get",
    url: `${searchAPI}?q=inauthor${APIKEY}`,
  }).then((response) => {
    console.log(response.data);
    res.json(response.data);
  });
});

module.exports = router;
