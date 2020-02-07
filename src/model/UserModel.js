const driver = require('../config/db/index')
const Sequelize = require('sequelize')

const User = driver.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = User
