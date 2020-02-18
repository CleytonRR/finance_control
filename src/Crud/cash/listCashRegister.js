const CashRegister = require('../../model/CashRegister')

class listCashRegister {
  static async registers (userId, num = 1) {
    try {
      const response = await CashRegister.findAll({
        where: {
          userId
        },
        limit: num,
        order: [
          ['created', 'DESC']
        ]
      })

      if (response.length === 0) {
        return (
          [
            true,
            response
          ]
        )
      }
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

module.exports = listCashRegister
