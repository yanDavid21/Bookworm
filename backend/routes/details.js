const express = require("express");
const router = express.Router();
const axios = require("axios");

const searchAPI = "https://www.googleapis.com/books/v1/volumes";
const APIKEY = `&key=AIzaSyCW29m4Tkp1NtCdM2jWzvqP9n-gjyO7Wl0`;

/* GET users listing. */
router.get("/", function (req, res, next) {
  const query = req.query.q;
  const isbn = req.query.isbn;
  const title = req.query.title;
  const subject = req.query.subject;
  const publisher = req.query.publisher;
  const author = req.query.author;
  const url = `${searchAPI}?q=${query}${title ? `+intitle:${title}` : ""}${
      subject ? `+subject:${subject}` : ""
  }${publisher ? `+inpublisher:${publisher}` : ""}${
      author ? `+inauthor:${author}` : ""
  }${isbn ? `+isbn:${isbn}` : ""}${APIKEY}`;
  axios({
    method: "get",
    url: url,
  })
  .then((response) => {
    res.status(200).json(response.data)
  })
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;
