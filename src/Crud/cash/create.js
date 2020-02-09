const CashRegister = require('../../model/CashRegister')

class createNewCashRegister {
  static async createNew (valorDay, enough, userId, created) {
    try {
      const response = await CashRegister.create({
        valorDay,
        enough,
        userId,
        created
      })
      return response
    } catch (error) {
      return false
    }
  }
}

module.exports = createNewCashRegister
