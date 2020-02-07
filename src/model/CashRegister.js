const driver = require('../config/db/index')
const Sequelize = require('sequelize')
const User = require('./UserModel')

const CashRegister = driver.define('cashregister', {
  valorDay: {
    type: Sequelize.FLOAT,
    allowNull: false
  },

  enough: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }

})

CashRegister.hasOne(User)

module.exports = CashRegister
