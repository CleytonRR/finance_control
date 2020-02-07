const validatorEmail = require('../util/emailValidator')
const validatorPassword = require('../util/passwordValidator')
const showUser = require('../Crud/user/show')
const GeneratorToken = require('../util/generatorToken')

module.exports = {
  async authenticar (req, res) {
    try {
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Need email and password for login' })
      }

      if (!validatorEmail.testEmail(req.body.email)) {
        return res.status(401).json({ message: 'Email or password invalid' })
      }

      if (!validatorPassword.testePass(req.body.password)) {
        return res.status(401).json({ message: 'Email or password invalid' })
      }

      if (await showUser.checkUserExists(req.body.email) === false) {
        return res.status(401).json({ message: 'Email or password invalid' })
      }
      const dados = await showUser.checkUserExists(req.body.email)
      const token = GeneratorToken.token(dados[1].id, dados[1].email)
      return res.status(200).json({ token })
    } catch (error) {
      return res.status(500).json({ message: 'Internal error' })
    }
  }
}
