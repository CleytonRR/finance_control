const createNewCashRegister = require('../Crud/cash/create')

module.exports = {
  async createNew (req, res) {
    try {
      return res.status(201).json({ message: 'Successfully authenticated' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal Error' })
    }
  }
}
