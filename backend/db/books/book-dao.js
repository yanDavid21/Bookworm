const model = require('./book-model')

const findAllBooks = () => model.find()

const deleteBook = (id) => model.deleteOne({_id: id})

const createBook = (book) => model.create(book)

const findBookById = (id) => model.findById(id)

const updateBook = (id, book) =>
    model.updateOne({_id: id},
        {$set: book});

const findBookByIsbn = (isbn) => 
  model.findOne({isbn: isbn})

const findBooksByIsbn = (isbns) => model.find({isbn: {$in: isbns}})

const replaceBook = (isbn, book) => 
  model.replaceOne({isbn: isbn}, book)

module.exports = {
  findAllBooks,
  deleteBook,
  createBook,
  findBookById,
  updateBook,
  findBookByIsbn,
  findBooksByIsbn,
  replaceBook
}