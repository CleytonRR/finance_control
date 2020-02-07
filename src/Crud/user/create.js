const User = require('../../model/UserModel')

class CreatNewUser {
  static async createUser (email, hashPass, expenditure = null) {
    try {
      const response = await User.create({
        email,
        password: hashPass,
        expenditure
      })
      return response
    } catch (error) {
      return false
    }
  }
}

module.exports = CreatNewUser
