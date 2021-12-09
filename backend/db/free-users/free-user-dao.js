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