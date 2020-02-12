const createNewCashRegister = require('../Crud/cash/create')
const showCashRegister = require('../Crud/cash/show')
const TokenData = require('../util/tokenDatas')
const enoughCheck = require('../util/enoughCheck')

module.exports = {
  async createNew (req, res) {
    try {
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Datas need for new cash Register' })
      }

      const dataRequest = req.body
      const tokenId = await TokenData.getId(req.headers.authorization)
      const expenditure = TokenData.expenditure(req.headers.authorization)
      const enough = enoughCheck.check(expenditure, dataRequest.valorDay)

      const valueData = await showCashRegister.checkCashRegisterExists(new Date(dataRequest.created), tokenId)

      if (!dataRequest.valorDay) {
        return res.status(400).json({ message: 'Valor Day not provided' })
      }

      if (valueData[0]) {
        return res.status(400).json({ message: 'There is already a record made today', dataAtual: valueData[0] })
      }

      await createNewCashRegister.createNew(
        dataRequest.valorDay,
        enough,
        tokenId,
        dataRequest.created
      )
      return res.status(201).json({ message: 'Created correct' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal Error' })
    }
  }
}
