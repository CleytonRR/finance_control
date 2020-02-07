const validatorEmail = require('../util/emailValidator')
const PassHash = require('../util/passwordHash')
const validatorPassword = require('../util/passwordValidator')
const CreatNewUser = require('../Crud/create')
const showUser = require('../Crud/show')

module.exports = {
  async create (req, res) {
    try {
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Datas need for new user' })
      }
      if (!validatorEmail.testEmail(req.body.email)) {
        return res.status(400).json({ message: 'Invalid email' })
      }

      if (!validatorPassword.testePass(req.body.password)) {
        return res.status(400).json({ message: 'Password should have length 8 and a letter and a number a special character and a letter capslock' })
      }

      if (await showUser.checkUserExists(req.body.email)) {
        return res.status(400).json({ message: 'Email already used' })
      }

      var passwordHash = await PassHash.generatorHash(req.body.password)
      const response = await CreatNewUser.createUser(req.body.email, passwordHash)
      return res.status(201).json({ email: response.email })
    } catch (error) {
      return res.status(500).json({ message: 'Internal error' })
    }
  }
}
