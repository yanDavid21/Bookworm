const PaidUser = require('./paid-user-model')

const findAllUsers = () => PaidUser.find()

const deleteUser = (id) => PaidUser.deleteOne({_id: id})

const createUser = (user) => {
  const doc = new PaidUser(user)
  doc.setPassword(password)
  doc.save()
}

const findUserById = (id) => PaidUser.findById(id)

const updateUser = (id, user) =>
    PaidUser.updateOne({_id: id},
        {$set: user});

const findUserByEmail = (email) => {
  docs = PaidUser.find({email: email})
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