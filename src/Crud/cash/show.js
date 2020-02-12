const CashRegister = require('../../model/CashRegister')

class showCashRegister {
  static async checkCashRegisterExists (created) {
    try {
      const response = await CashRegister.findOne({
        where: { created }
      })

      if (response === null || parseInt(response) === 0) {
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

module.exports = showCashRegister
