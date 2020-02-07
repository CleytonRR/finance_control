class validatorEmail {
  static testEmail (email) {
    const expressionTest = /^(([^<;>;()[\]\\.,;:\s@"]+(\.[^<;>;()[\]\\.,;:\s@"]+)*)|(".+"))@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!expressionTest.test(email)) {
      return false
    }
    return true
  }
}

module.exports = validatorEmail
