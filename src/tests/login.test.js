/* eslint-env mocha */
require('dotenv').config()
const assert = require('assert')
const request = require('supertest')
const app = require('../index')
const jwt = require('jsonwebtoken')
const GeneratorToken = require('../util/generatorToken')
const VerifyToken = require('../util/verifyToken')
const PassHash = require('../util/passwordHash')
const CreatNewUser = require('../Crud/user/create')
const User = require('../model/UserModel')

const mockUser = {
  id: 1,
  email: 'any_email@gmail.com',
  password: 'asdqweAA_11'
}

const emailInvalid = {
  email: 'email_invalid@gma,,,.com',
  password: 'asdqweAA_11'
}

const passInvalid = {
  email: 'any_email@gmail.com',
  password: 'invalidpass'
}

const invalidUser = {
  email: 'any_invalid@gmail.com',
  password: 'any_password11A'
}

const messageError = 'Email or password invalid'

var invalidToken = ''
var validtoken = ''

describe('Suite tests for ensure correct login', function () {
  this.beforeAll(async function () {
    await User.sync({ force: true })
  })

  this.beforeAll(async function () {
    var passwordHash = await PassHash.generatorHash(mockUser.password)
    await CreatNewUser.createUser(mockUser.email, passwordHash)
  })

  it('Ensure return a token basead in email and id of user', () => {
    const response = GeneratorToken.token(mockUser.id, mockUser.email)
    validtoken = response
    invalidToken = 's' + response
    var decoded = jwt.verify(response, process.env.JWT_KEY)
    assert.deepStrictEqual(mockUser.id, decoded.id)
    assert.deepStrictEqual(mockUser.email, decoded.email)
  })

  it('Return error if token is provided is invalid', () => {
    const result = VerifyToken.verify(invalidToken)
    assert.deepStrictEqual(false, result)
  })

  it('Return true if token provided is valid', () => {
    const result = VerifyToken.verify(validtoken)
    assert.deepStrictEqual(true, result)
  })

  it('POST/Login -> If email and password provided is valid, return a token', async () => {
    const response = await request(app).post('/login').send(mockUser).set('Accept', 'application/json')
    var decoded = jwt.verify(response.body.token, process.env.JWT_KEY)
    assert.deepStrictEqual(mockUser.id, decoded.id)
    assert.deepStrictEqual(mockUser.email, decoded.email)
    assert.deepStrictEqual(200, response.status)
  })

  it('POST/Login -> if email provided invalid return status 401 and message Email or password invalid', async () => {
    const response = await request(app).post('/login').send(emailInvalid).set('Accept', 'application/json')
    assert.deepStrictEqual(messageError, response.body.message)
    assert.deepStrictEqual(401, response.status)
  })

  it('POST/Login -> if password provided invalid return status 401 and message Email or password invalid', async () => {
    const response = await request(app).post('/login').send(passInvalid).set('Accept', 'application/json')
    assert.deepStrictEqual(messageError, response.body.message)
    assert.deepStrictEqual(401, response.status)
  })

  it('POST/Login -> if user provided invalid return status 401 and message Email or password invalid', async () => {
    const response = await request(app).post('/login').send(invalidUser).set('Accept', 'application/json')
    assert.deepStrictEqual(messageError, response.body.message)
    assert.deepStrictEqual(401, response.status)
  })

  it('POST/Login -> if user not provided datas for login return error 400', async () => {
    const response = await request(app).post('/login').send({}).set('Accept', 'application/json')
    assert.deepStrictEqual('Need email and password for login', response.body.message)
    assert.deepStrictEqual(400, response.status)
  })

  it('Test for ensure correct token in header for acess url', async () => {
    const response = await request(app).get('/private').send(mockUser).set({ authorization: 'beer ' + validtoken, Accept: 'application/json' })
    assert.deepStrictEqual(200, response.status)
  })

  it('Test for ensure if incorrect token in header return status 401', async () => {
    const response = await request(app).get('/private').send(mockUser).set({ authorization: 'beer ' + invalidToken, Accept: 'application/json' })
    assert.deepStrictEqual(401, response.status)
  })

  it('Test for ensure if token is not provided in header return status 400', async () => {
    const response = await request(app).get('/private').send(mockUser).set({ Accept: 'application/json' })
    assert.deepStrictEqual(400, response.status)
    assert.deepStrictEqual('Token is not provided', response.body.message)
  })
})
