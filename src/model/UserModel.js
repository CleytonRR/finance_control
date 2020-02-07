const driver = require('../config/db/index')
const Sequelize = require('sequelize')
const CashRegister = require('./CashRegister')

const User = driver.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false
  },

  expenditure: {
    type: Sequelize.FLOAT,
    allowNull: true
  }

})

User.hasMany(CashRegister, { as: 'cashregister', foreignKey: 'userId' })

module.exports = User
