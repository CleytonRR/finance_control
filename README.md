# finance_control

API builder for Finance Control app

## Getting Started

### Prerequisites

you need to have the following packages installed

```
Node and yarn
```

for install consult: 
* [Node](https://nodejs.org/en/)
* [yarn](https://yarnpkg.com/)

### Installing

```
git@github.com:CleytonRR/finance_control.git
```
After:
```
cd finance_control/
```
then, install all dependencies
```
yarn install
```
when finished, create the .env file in the root folder, follow the instructions for creating

<img src='/src/img/img_readmi.png' height="500" width="500">

## Running the tests

For run the automated tests use:
```
yarn test
```
Or run test with coverage
```
yarn testCoverage
```

## Running API

for run API use:

```
yarn start
```

## How to use

We have four routes
/user
/login
/cashRegister
/cashRegister/:registerCont

**example build with [Insomnia](https://insomnia.rest/download/)**

**/user**
router use is a router which make create a new users
accepts email and password in json format
<br />

**usage example:** 
<br />

<img src='/src/img/user.png' height="500" width="500">
<img src='/src/img/createUser.png' height="500" width="500">
<br />

**password** - should have length minimal 8 a character have a character caps lock, number and character special

**/login**
in this route should receive an email and password valid and return a token for authenticate
<br />

**example**

<br />
<img src='/src/img/login.png' height="500" width="500">
<img src='/src/img/loginEschema.png' height="500" width="500">
<br />

**/cashRegister**
<br />
this route is protected to access it, a token that was generated during login must pass in the request header

**example**
<br />

<img src='/src/img/cashRegister.png' height="500" width="500">
<img src='/src/img/createCashRegisterSchema.png' height="500" width="500">

**/cashRegister/:registerCont**
<br />
this route return an array with a list of cash register with length specified in route

**example**
<br />

<img src='/src/img/listCashRegister.png' height="500" width="500">
<img src='/src/img/listCashRegisterSchema.png' height="500" width="500">

<br />

## Built With

* [Express](https://expressjs.com/) - The web framework used
* [Sequelize](https://sequelize.org/) - ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL
* [Bcrypt](https://mochajs.org/) - used for transform password in a hash
* [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Module for generator tokens
* [Mocha](https://mochajs.org/) - used for testing
* [Helmet](https://www.npmjs.com/package/helmet) - for ensure security in API
* [Supertest](https://www.npmjs.com/package/supertest) - used to make requests in the api inside the test suite

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)




