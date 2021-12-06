const model = require('./paid-user-model')

const findAllBooks = () => model.find()

const deleteBook = (id) => model.deleteOne({_id: id})

const createBook = (book) => model.create(book)

const findBookById = (id) => model.findById(id)

const updateBook = (id, book) =>
    model.updateOne({_id: id},
        {$set: book});

module.exports = {
  findAllBooks,
  deleteBook,
  createBook,
  findBookById,
  updateBook
}