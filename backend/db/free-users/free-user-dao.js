const FreeUser = require('./free-user-model')

const findAllUsers = () => FreeUser.find()

const deleteUser = (id) => FreeUser.deleteOne({_id: id})

const createUser = (user, password) => {
  const doc = new FreeUser(user)
  doc.setPassword(password)
  doc.save()
}

const findUserById = (id) => FreeUser.findById(id)

const updateUser = (id, user) =>
    FreeUser.updateOne({_id: id},
        {$set: user});

const findUserByEmail = (email) => {
  docs = FreeUser.find({email: email})
  return docs
}

module.exports = {
  findAllUsers,
  deleteUser,
  createUser,
  findUserById,
  updateUser,
  findUserByEmail
}