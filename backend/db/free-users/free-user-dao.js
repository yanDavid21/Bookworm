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
  return FreeUser.findOne({email: email})
  
}

const validateLogin = (email, password, callback) => {
  console.log("Validating login")
  FreeUser.find({email: email}, function (err, docs) {
    // console.log("DOCS::::: " + typeof(docs))
    // console.log(JSON.stringify(docs))
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