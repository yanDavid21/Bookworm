const model = require('./profile-model')

const findAllProfiles = () => model.find()

const deleteProfile = (id) => model.deleteOne({_id: id})

const createProfile = (profile) => model.create(profile)

const findProfileById = (id) => model.findById(id)


module.exports = {
  findAllProfiles,
  deleteProfile,
  createProfile,
  findProfileById
}