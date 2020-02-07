const jwt = require('jsonwebtoken')

class VerifyToken {
  static verify (token) {
    try {
      jwt.verify(token, process.env.JWT_KEY)
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = VerifyToken
