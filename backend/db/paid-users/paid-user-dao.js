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

const validateLogin = (email, password) => {
  docs = findUserByEmail(email)
  if (docs.length() > 1) {
    console.error("validateLogin: more than one user found for email " + email)
  } else if (docs.length() === 0) {
    return false;
  } else {
    doc = docs[0]
    return PaidUser.validatePassword(password, doc.password)
  }
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