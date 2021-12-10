const PaidUser = require('./paid-user-model')

const findAllUsers = () => PaidUser.find()

const deleteUser = (id) => PaidUser.deleteOne({_id: id})

const createUser = (user, password) => {
  user.friends = []
  const doc = new PaidUser(user)
  doc.setPassword(password)
  doc.save()
}

const findUserById = (id) => PaidUser.findById(id)

const updateUser = (id, user) =>
    PaidUser.updateOne({_id: id},
        {$set: user});

const findUserByEmail = (email) => {
  return PaidUser.findOne({email: email})
}

const validateLogin = (email, password, callback) => {
  console.log("Validating login")
  PaidUser.find({email: email}, function (err, docs) {
    if (docs.length === 0) {
      callback(false);
    } else if (docs.length === 1) {
      const doc = docs[0]
      callback(doc.validatePassword(password, doc.password))
    }
  })

}

module.exports = {
  findAllUsers,
  deleteUser,
  createUser,
  findUserById,
  updateUser,
  findUserByEmail,
  validateLogin
}