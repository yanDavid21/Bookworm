const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cookieDao = require("../db/cookies/cookie-dao");
const freeUserDao = require("../db/free-users/free-user-dao");
const paidUserDao = require("../db/paid-users/paid-user-dao");
const bookDao = require("../db/books/book-dao");
const authorDao = require("../db/authors/author-dao")

async function addAuthors(authors, isbn, res) {
  authors.forEach(async author => {
    console.log("Author: " +  author)
    const authorContained = await authorDao.containsAuthor(author);
    console.log(authorContained)
    if (!authorContained) {
      const authorObj = await authorDao.findAuthorByName(author);
      dbAuthorBooks = authorObj.books
      if (!dbAuthorBooks.includes(isbn)) {
        dbAuthorBooks.push(isbn)
      }
      console.log("AUTHOR ID: " + authorObj.id)
      authorObj.books = dbAuthorBooks
      await authorDao.updateAuthor(new mongoose.Types.ObjectId(authorObj.id), authorObj)
    } else {
      console.log("Creating author")
      await authorDao.createAuthor({name: author, books: [isbn]})
    }
  })
  res.status(200).send({
    message: "Successfully added books and author"
  })

}

const addBookToList = (listType, user, userDao, isbn, res, authors) => {
  const userId = user.id;
  const userListToUpdate = user[listType];
  if (!userListToUpdate.includes(isbn)) {
    userListToUpdate.push(isbn);
  }

  user[listType] = userListToUpdate;
  userDao.updateUser(userId, user).then((status) => {
    addAuthors(authors, isbn, res);
  });
};

const addBookToDbAndUser = (listType, bookInfo, user, userDao, isbn, res) => {
  bookDao.findBookByIsbn(isbn).then((book) => {
    let newId = new mongoose.Types.ObjectId();
    if (book === null) {
      console.log(
        "No book with the given isbn found, adding new book to database"
      );
      newBook = {
        _id: newId,
        isbn: isbn,
        title: bookInfo.title,
        authors: bookInfo.authors,
        publisher: bookInfo.publisher ?? "",
        publishedDate: bookInfo.publishedDate ?? "",
        description: bookInfo.publishedDate ?? "",
        addedCount: 1,
        image: bookInfo.imageLinks.thumbnail ?? "",
      };
      bookDao.createBook(newBook).then((createResult) => {
        addBookToList(listType, user, userDao, isbn, res, bookInfo.authors);
      });
    } else {
      const addedCount = book.addedCount + 1;
      book.addedCount = addedCount;
      newId = book.id;
      bookDao.replaceBook(isbn, book).then((replaceResult) => {
        if (replaceResult.acknowledged) {
          console.log("------------Book replaced");
          addBookToList(listType, user, userDao, isbn, res, bookInfo.authors);
        } else {
          res.status(500).send({
            message: "internal server error while replacing existing book",
          });
        }
      });
    }
  });
};

router.post("/", function (req, res) {
  const token = req.body.token;
  const listType = req.body.listType;
  const bookInfo = req.body.bookInfo;
  const isbn = req.body.isbn;

  console.log("Add book backend-----------------");
  console.log("TOKEN FROM BROWSER: " + token);

  // find user associated with cookie
  cookieDao.findUser(token).then((cookie) => {
    const userId = cookie.user;
    freeUserDao.findUserById(userId).then((user) => {
      if (user === null) {
        paidUserDao.findUserById(userId).then((user) => {
          if (user === null) {
            res.status(403).send({
              message: "User corresponding to given token not found.",
            });
          } else {
            // paid users
            console.log("PAID USER");
            addBookToDbAndUser(
              listType,
              bookInfo,
              user,
              paidUserDao,
              isbn,
              res
            );
          }
        });
      } else {
        // free users
        console.log("FREE USER");
        addBookToDbAndUser(listType, bookInfo, user, freeUserDao, isbn, res);
      }
    });
  });
});

router.put("/", function (req, res) {
  console.log(req.body)
  const token = req.body.token;
  const listType = req.body.listType;
  const isbn = req.body.isbn;

  const removeBookFromUserList = (user, userDao) => {
    const userId = user.id;
    console.log(user);
    console.log(listType)
    let userListToUpdate = user[listType];
    userListToUpdate = userListToUpdate.filter(item => item !== isbn)

    user[listType] = userListToUpdate;
    userDao.updateUser(userId, user).then((status) => {
      console.log("updated list")
      res.send({
        status: status,
        message: "updated user book list",
      });
    });
  };

  cookieDao.findUser(token).then((cookie) => {
    const userId = cookie.user;
    freeUserDao.findUserById(userId).then((user) => {
      if (user === null) {
        paidUserDao.findUserById(userId).then((user) => {
          if (user === null) {
            res.status(403).send({
              message: "User corresponding to given token not found.",
            });
          } else {
            // paid users
            console.log("PAID USER");
            removeBookFromUserList(user, paidUserDao);
          }
        });
      } else {
        // free users
        console.log("FREE USER");
        removeBookFromUserList(user, freeUserDao);
      }
    });
  });
});

module.exports = router;
