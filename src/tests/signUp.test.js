/* eslint-env mocha */
const assert = require('assert')
const request = require('supertest')
const validatorEmail = require('../util/emailValidator')
const validatorPassword = require('../util/passwordValidator')
const PassHash = require('../util/passwordHash')
const CreatNewUser = require('../Crud/create')
const showUser = require('../Crud/show')
const User = require('../model/UserModel')
const app = require('../index')

const MockCreate = {
  email: 'any_email@gmail.com',
  password: 'any_pass11A'
}

const MockCreateRouter = {
  email: 'other_email@gmail.com',
  password: 'other_pass11A'
}

describe('Suite tests for ensure correct sign up', function () {
  this.beforeAll(async function () {
    await User.sync({ force: true })
  })

  it('return True if provided correct email', () => {
    const response = validatorEmail.testEmail('any_email_correct@gmail.com')
    assert.ok(response === true)
  })

  it('Return False if provided incorrect email', () => {
    const response = validatorEmail.testEmail('any_email_incorrect@gm,ail.com')
    assert.ok(response === false)
  })

  it('Return true if password provided have length 8 and minimal a letter and one number and character special and letter capslock', () => {
    const response = validatorPassword.testePass('asdq11_A@')
    assert.ok(response === true)
  })

  it('Return false if password provided no have length 6', () => {
    const response = validatorPassword.testePass('asd')
    assert.ok(response === false)
  })

  it('Return false if password provided no have a letter', () => {
    const response = validatorPassword.testePass('123456')
    assert.ok(response === false)
  })

  it('Return false if password provided no have a number', () => {
    const response = validatorPassword.testePass('asdqwe')
    assert.ok(response === false)
  })

  it('Return a hash basead in password', async () => {
    const response = await PassHash.generatorHash('any_pass11')
    const compareResponse = await PassHash.compareHash('any_pass11', response)
    assert.ok(compareResponse === true)
  })

  it('Return false if password provided be diferent', async () => {
    const response = await PassHash.generatorHash('any_pass11')
    const compareResponse = await PassHash.compareHash('any_pass_diferent1', response)
    assert.ok(compareResponse === false)
  })

  it('Ensure created user with password in hash', async () => {
    const hashPass = await PassHash.generatorHash(MockCreate.password)
    const creatUser = await CreatNewUser.createUser(MockCreate.email, hashPass)
    assert.deepStrictEqual(MockCreate.email, creatUser.email)
  })

  it('Return true if email provided already used', async () => {
    const response = await showUser.checkUserExists(MockCreate.email)
    assert.ok(response[0] === true)
  })

  it('Return false if email provided not already used', async () => {
    const response = await showUser.checkUserExists('any_email_Not_used@gmail.com')
    assert.ok(response === false)
  })

  it('POST/user -> Ensure creation of new user with unique email', async () => {
    const response = await request(app).post('/user').send(MockCreateRouter).set('Accept', 'application/json')
    assert.deepStrictEqual(MockCreateRouter.email, response.body.email)
    assert.deepStrictEqual(201, response.statusCode)
  })

  it('POST/user -> Return a error 400 if email already used', async () => {
    const response = await request(app).post('/user').send(MockCreateRouter).set('Accept', 'application/json')
    assert.deepStrictEqual('Email already used', response.body.message)
    assert.deepStrictEqual(400, response.statusCode)
  })

  it('POST/Login -> if no provided datas return 400', async () => {
    const response = await request(app).post('/user').send({}).set('Accept', 'application/json')
    assert.deepStrictEqual(400, response.status)
    assert.deepStrictEqual('Datas need for new user', response.body.message)
  })
})
