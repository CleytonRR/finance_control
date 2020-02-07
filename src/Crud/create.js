const User = require('../model/UserModel')

class CreatNewUser {
  static async createUser (email, hashPass) {
    try {
      const response = await User.create({
        email,
        password: hashPass
      })
      return response
    } catch (error) {
      return false
    }
  }
}

module.exports = CreatNewUser
