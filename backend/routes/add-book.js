const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const cookieDao = require("../db/cookies/cookie-dao")
const freeUserDao = require("../db/free-users/free-user-dao")
const paidUserDao = require("../db/paid-users/paid-user-dao")
const bookDao = require("../db/books/book-dao")

const addBookToList = (listType, user, userDao, bookId, res) => {
  const userId = user.id
  const userListToUpdate = user[listType]
  if (!userListToUpdate.includes(bookId)) {
    userListToUpdate.push(bookId)
  }
  
  user[listType] = userListToUpdate
  userDao.updateUser(userId, user, res).then(status => {
    res.send({
      status: status,
      message: "added to user book list"
    })
  })
}

const addBookToDbAndUser = (listType, bookInfo, user, userDao, isbn, res) => {
  bookDao.findBookByIsbn(isbn).then(book => {
    let newId = new mongoose.Types.ObjectId()
    if (book === null) {
      console.log("No book with the given isbn found, adding new book to database")
      newBook = {
        _id: newId,
        isbn: isbn,
        title: bookInfo.title,
        authors: bookInfo.authors,
        publisher: bookInfo.publisher ?? '',
        publishedDate: bookInfo.publishedDate ?? '',
        description: bookInfo.publishedDate ?? '', 
        addedCount: 1,
        image: bookInfo.imageLinks.thumbnail ?? ''
      }
      bookDao.createBook(newBook).then(createResult => {
        addBookToList(listType, user, userDao, newId, res)
      })
    } else {
      const addedCount = book.addedCount + 1
      book.addedCount = addedCount
      newId = book.id
      bookDao.replaceBook(isbn, book).then(replaceResult => {
        if (replaceResult.acknowledged) {
          console.log("------------Book replaced")
          addBookToList(listType, user, userDao, newId, res)
        } else {
          res.status(500).send({
            message: "internal server error while replacing existing book"
          })
        }
      })
    }
  })
}

router.post('/', function (req, res) {
  const token = req.body.token
  const listType = req.body.listType
  const bookInfo = req.body.bookInfo
  const isbn = req.body.isbn

  console.log("Add book backend-----------------")
  console.log("TOKEN FROM BROWSER: " + token)

  // find user associated with cookie
  cookieDao.findUser(token).then(cookie => {
    const userId = cookie.user
    freeUserDao.findUserById(userId).then(user => {
      if (user === null) {
        paidUserDao.findUserById(userId).then(user => {
          if (user === null) {
            res.status(403).send({
              message: "User corresponding to given token not found."
            })
          } else {
            // paid users
            console.log("PAID USER")
            addBookToDbAndUser(listType, bookInfo, user, paidUserDao, isbn, res)
            
          }
        })
      } else {
        // free users 
        console.log("FREE USER")
        addBookToDbAndUser(listType, bookInfo, user, freeUserDao, isbn, res)
      }
    })
  })
})

module.exports = router