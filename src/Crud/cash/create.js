const CashRegister = require('../../model/CashRegister')

class createNewCashRegister {
  static async createNew (valorDay, enough, userId) {
    try {
      const response = await CashRegister.create({
        valorDay,
        enough,
        userId
      })
      return response
    } catch (error) {
      return false
    }
  }
}

module.exports = createNewCashRegister
