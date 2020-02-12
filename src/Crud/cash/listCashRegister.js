const CashRegister = require('../../model/CashRegister')

class listCashRegister {
  static async registers (userId) {
    try {
      const response = await CashRegister.findAll({
        where: {
          userId
        }
      })

      if (response === null || parseInt(response) === 0 || response.length === 0) {
        return false
      }
      return (
        [
          true,
          response
        ]
      )
    } catch (error) {
      console.log('Internal Error')
    }
  }
}

module.exports = listCashRegister
