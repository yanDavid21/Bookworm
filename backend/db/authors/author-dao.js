const model = require('./author-model')

const findAllAuthors = () => model.find()

const deleteAuthor = (id) => model.deleteOne({_id: id})

const createAuthor = (author) => model.create(author)

const findAuthorById = (id) => model.findById(id)

const updateAuthor = (id, author) =>
    model.updateOne({_id: id},
        {$set: author});

module.exports = {
  findAllAuthors,
  deleteAuthor,
  createAuthor,
  findAuthorById,
  updateAuthor
}