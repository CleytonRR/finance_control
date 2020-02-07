const VerifyToken = require('../util/verifyToken')

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'Token is not provided' })
    }
    const token = req.headers.authorization.split(' ')[1]
    if (VerifyToken.verify(token)) {
      next()
    } else {
      return res.status(401).send({ message: 'Authentication failure' })
    }
  } catch (error) {
    return res.status(500).send({ message: 'Internal Error' })
  }
}
