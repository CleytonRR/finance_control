const { Router } = require('express')
const UserController = require('./controller/UserController')
const LoginController = require('./controller/LoginController')
const CashRegister = require('./controller/CashRegister')
const testLogin = require('./middleware/testLogin')

const routes = Router()

routes.post('/user', UserController.create)
routes.post('/login', LoginController.authenticar)
routes.post('/cashRegister', testLogin, CashRegister.createNew)

module.exports = routes
