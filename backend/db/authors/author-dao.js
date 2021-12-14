const model = require('./author-model')

const findAllAuthors = () => model.find()

const deleteAuthor = (id) => model.deleteOne({_id: id})

const createAuthor = (author) => model.create(author).then(createdAuthor => {
  console.log(createdAuthor)
  return createdAuthor
})

const findAuthorById = (id) => model.findById(id)

const findAuthorByName = (name) => model.findOne({name: name}).then(author => {
  return author
})

const updateAuthor = (id, author) =>
    model.updateOne({_id: id},
        {$set: author});

const containsAuthor = (author) => {
  return model.findOne({author}).then(author => {
    if (author === null) {
      return false;
    } else {
      return true;
    }
  })
}

module.exports = {
  findAllAuthors,
  deleteAuthor,
  createAuthor,
  findAuthorById,
  findAuthorByName,
  updateAuthor,
  containsAuthor
}