require('dotenv').config()
const jwt = require('jsonwebtoken')

class GeneratorToken {
  static token (id, email) {
    const response = jwt.sign({
      id,
      email
    }, process.env.JWT_KEY,
    {
      expiresIn: '1h'
    })
    return response
  }
}

module.exports = GeneratorToken
