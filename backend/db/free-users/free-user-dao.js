const model = require('./free-user-model')

const findAllFreeUsers = () => model.find()

const deleteFreeUser = (id) => model.deleteOne({_id: id})

const createFreeUser = (freeUser) => model.create(freeUser)

const findFreeUserById = (id) => model.findById(id)

const updateFreeUser = (id, user) =>
    model.updateOne({_id: id},
        {$set: user});

module.exports = {
  findAllFreeUsers,
  deleteFreeUser,
  createFreeUser,
  findFreeUserById,
  updateFreeUser
}