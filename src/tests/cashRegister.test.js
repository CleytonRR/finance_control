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
const GeneratorToken = require('../util/generatorToken')

const mockCashRegister = {
  valorDay: 30,
  created: new Date().toLocaleDateString([], { Option: { timeZone: 'America/Sao_Paulo' } })
}

const mockCashRouter = {
  valorDay: 30,
  created: new Date('February 1, 2020')
}

const mockCashRouterDate = {
  created: new Date('February 1, 2020')
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
var token = ''

// From correct function created tokens and past here

// Token with datas, datas created and token generator in API
var tokenDb = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbnlfbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE1ODE1NTg0MzgsImV4cCI6MTU4MTU2MjAzOH0.QA-O1dskPKM0w-mE3z4PsOqGVkWtBEE8I54ZImIl0FI'
// Token without datas created and token gerator in api
var tokenWhitoutDatas = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJhbnlfbWFpbG1haWxtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTU4MTU1ODM5NCwiZXhwIjoxNTgxNTYxOTk0fQ.Yab5xwkFZXL1KAadZlmNrpn32GS9Ia9JzrZyn579V_8'

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
    token = GeneratorToken.token(creatUser.id, creatUser.email)
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
    const response = await createNewCashRegister.createNew(mockCashRegisterFalse.valorDay, testDatas, idValid, mockCashRegisterFalse.created)
    assert.deepStrictEqual(mockCashRegisterFalse.valorDay, response.valorDay)
    assert.deepStrictEqual(false, response.enough)
    assert.deepStrictEqual(idValid, response.userId)
    assert.deepStrictEqual(new Date().getDate(), response.created.getDate())
  })

  it('Ensure unique creation of cashRegister peer day', async () => {
    const response = await showCashRegister.checkCashRegisterExists(new Date(mockCashRegister.created), idValid)
    assert.deepStrictEqual(true, response[0])
  })

  it('Make sure to return false if cash register does not have the requested date at creation', async () => {
    const response = await showCashRegister.checkCashRegisterExists(new Date('February 1, 2020'), idValid)
    assert.deepStrictEqual(false, response)
  })

  it('POST/cashRegister -> return 400 if no data provided in body request', async () => {
    const response = await request(app).post('/cashRegister').send({}).set({ authorization: 'beer ' + token, Accept: 'application/json' })
    assert.deepStrictEqual(400, response.status)
  })

  it('POST/cashRegister -> return 400 if date already use', async () => {
    const response = await request(app).post('/cashRegister').send(mockCashRegister).set({ authorization: 'beer ' + token, Accept: 'application/json' })
    assert.deepStrictEqual(400, response.status)
    assert.deepStrictEqual('There is already a record made today', response.body.message)
  })

  it('POST/cashRegister -> return 400 if valor day not provided in body request', async () => {
    const response = await request(app).post('/cashRegister').send(mockCashRouterDate).set({ authorization: 'beer ' + token, Accept: 'application/json' })
    assert.deepStrictEqual(400, response.status)
    assert.deepStrictEqual('Valor Day not provided', response.body.message)
  })

  it('POST/cashRegister -> return 201 if correct datas are provided', async () => {
    const response = await request(app).post('/cashRegister').send(mockCashRouter).set({ authorization: 'beer ' + token, Accept: 'application/json' })
    assert.deepStrictEqual(201, response.status)
  })

  it('GET/cashRegister -> return list with results basead in user id', async () => {
    // Test make using token from api
    const cont = 10
    const response = await request(app).get(`/cashRegister/${cont}`).set({ authorization: 'beer ' + tokenDb, Accept: 'application/json' })
    assert.deepStrictEqual(200, response.status)
    assert.deepStrictEqual(cont, response.body.length)
    console.log(response.body)
  })

  it('GET/cashRegister -> return 400 if not data associeted the user id', async () => {
    // Test make using token from api
    const response = await request(app).get('/cashRegister/2').set({ authorization: 'beer ' + tokenWhitoutDatas, Accept: 'application/json' })
    assert.deepStrictEqual(400, response.status)
    assert.deepStrictEqual('not datas', response.body.message)
  })
})
