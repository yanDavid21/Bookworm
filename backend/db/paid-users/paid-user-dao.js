const model = require('./paid-user-model')

const findAllPaidUsers = () => model.find()

const deletePaidUser = (id) => model.deleteOne({_id: id})

const createPaidUser = (book) => model.create(book)

const findPaidUserById = (id) => model.findById(id)

const updatePaidUser = (id, user) =>
    model.updateOne({_id: id},
        {$set: user});

module.exports = {
  findAllPaidUsers,
  deletePaidUser,
  createPaidUser,
  findPaidUserById,
  updatePaidUser
}