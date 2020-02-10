const jwt = require('jsonwebtoken')
const showUser = require('../Crud/user/show')

class TokenData {
  static async expenditure (tokenBeer) {
    const token = tokenBeer.split(' ')[1]
    try {
      const datasToken = jwt.verify(token, process.env.JWT_KEY)
      const datasUser = await showUser.checkUserExists(datasToken.email)
      return datasUser[1].expenditure
    } catch (error) {
      return false
    }
  }
}

module.exports = TokenData
