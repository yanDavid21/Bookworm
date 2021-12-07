const express = require("express");
const router = express.Router();
const axios = require("axios");

const searchAPI = "https://www.googleapis.com/books/v1/volumes";
const APIKEY = `:keyes&key=AIzaSyCW29m4Tkp1NtCdM2jWzvqP9n-gjyO7Wl0`;

/* GET users listing. */
router.get("/", function (req, res, next) {
  const query = req.query.q;
  const title = req.query.title;
  const subject = req.query.subject;
  const publisher = req.query.publisher;
  const author = req.query.author;
  const url = `${searchAPI}?q=${query}${title && `+intitle:${title}`}${subject && `+subject:${subject}`}${publisher && `+inpublisher:${publisher}`}${author && `+inauthor:${author}`}${APIKEY}` 
  axios({
    method: "get",
    url: url,
  }).then((response) => {
    console.log(response.data);
    res.json(response.date);
  });
});

module.exports = router;
