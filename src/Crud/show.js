const User = require('../model/UserModel')

class showUser {
  static async checkUserExists (email) {
    try {
      const response = await User.findOne({
        where: { email }
      })
      if (response === null || parseInt(response) === 0) {
        return false
      }
      return (
        [
          true,
          response
        ]
      )
    } catch (error) {
      console.log('Internal Error')
    }
  }
}

module.exports = showUser
