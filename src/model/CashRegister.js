const driver = require('../config/db/index')
const Sequelize = require('sequelize')

const CashRegister = driver.define('cashregister', {
  valorDay: {
    type: Sequelize.FLOAT,
    allowNull: false
  },

  enough: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },

  created: {
    type: Sequelize.DATE
  }

}, {
  timestamps: false
})

module.exports = CashRegister
