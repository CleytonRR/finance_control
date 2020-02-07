class validatorPassword {
  static testePass (password) {
    const regexTest = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    if (!regexTest.test(password)) {
      return false
    }
    return true
  }
}

module.exports = validatorPassword
