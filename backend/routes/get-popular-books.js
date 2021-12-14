const express = require("express")
const router = express.Router()
const bookDao = require("../db/books/book-dao")

router.get('/', function (req, res) {
  console.log("Reached backend")
  bookDao.findAllBooks().sort({addedCount: 'desc'}).then((books) => {
    if (books.length > 6) {
      books = books.slice(0, 6)
    }
    res.status(200).json(books)
  })
})

module.exports = router