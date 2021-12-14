const express = require("express")
const router = express.Router()
const bookDao = require("../db/books/book-dao")
const authorDao = require("../db/authors/author-dao")

router.post('/', function (req, res) {
  authorName = req.body.authorName
  console.log("Author name (backend): " + authorName)
  authorDao.findAuthorByName(authorName).then(author => {
    if (author === null) {
      res.status(409).send({
        message: "Author not found."
      })
    }
    const bookIsbns = author.books
    bookDao.findBooksByIsbn(bookIsbns).then(books => {
      res.status(200).json(books)
    })
  })
})

module.exports = router
