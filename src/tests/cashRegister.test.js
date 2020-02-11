/* eslint-env mocha */
require('dotenv').config()
const assert = require('assert')
const request = require('supertest')
const app = require('../index')
const CashRegister = require('../model/CashRegister')
const createNewCashRegister = require('../Crud/cash/create')
const showCashRegister = require('../Crud/cash/show')
const CreatNewUser = require('../Crud/user/create')
const User = require('../model/UserModel')
const PassHash = require('../util/passwordHash')
const enoughCheck = require('../util/enoughCheck')

const mockCashRegister = {
  valorDay: 30,
  created: new Date().toLocaleDateString([], { Option: { timeZone: 'America/Sao_Paulo' } })
}

const mockCashRegisterFalse = {
  valorDay: 5,
  created: new Date().toLocaleDateString([], { Option: { timeZone: 'America/Sao_Paulo' } })
}

const user = {
  email: 'any_email@gmail.com',
  password: 'any_PASS@11',
  expenditure: 300
}

var idValid = ''

describe.only('Ensure correct create for CashRegister', function () {
  this.beforeAll(async function () {
    await User.sync({})
  })

  this.beforeAll(async function () {
    await CashRegister.sync()
  })

  this.beforeAll(async function () {
    const hashPass = await PassHash.generatorHash(user.password)
    const creatUser = await CreatNewUser.createUser(user.email, hashPass, user.expenditure)
    idValid = creatUser.id
  })

  this.afterAll(async function () {
    await CashRegister.destroy({
      where: {
        id: idValid
      }
    })

    await User.destroy({
      where: {
        id: idValid
      }
    })
  })

  it('If valorDay bigger equal which expenditure for day, create cash Register with enough true', async () => {
    const testDatas = enoughCheck.check(user.expenditure / 30, mockCashRegister.valorDay)
    const response = await createNewCashRegister.createNew(mockCashRegister.valorDay, testDatas, idValid, mockCashRegister.created)
    assert.deepStrictEqual(mockCashRegister.valorDay, response.valorDay)
    assert.deepStrictEqual(true, response.enough)
    assert.deepStrictEqual(idValid, response.userId)
    assert.deepStrictEqual(new Date().getDate(), response.created.getDate())
  })

  it('If valorDay smaller which expenditure for day, create cash Register with enough false', async () => {
    const testDatas = enoughCheck.check(user.expenditure / 30, mockCashRegisterFalse.valorDay)
    console.log((user.expenditure) / 30, mockCashRegisterFalse.valorDay)
    const response = await createNewCashRegister.createNew(mockCashRegisterFalse.valorDay, testDatas, idValid, mockCashRegisterFalse.created)
    assert.deepStrictEqual(mockCashRegisterFalse.valorDay, response.valorDay)
    assert.deepStrictEqual(false, response.enough)
    assert.deepStrictEqual(idValid, response.userId)
    assert.deepStrictEqual(new Date().getDate(), response.created.getDate())
  })

  it('Ensure unique creation of cashRegister peer day', async () => {
    const response = await showCashRegister.checkCashRegisterExists(new Date(mockCashRegister.created))
    assert.deepStrictEqual(true, response[0])
  })
})
