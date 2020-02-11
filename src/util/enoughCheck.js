class enoughCheck {
  static check (userValor, valorDay) {
    if (valorDay >= userValor) {
      return true
    } else {
      return false
    }
  }
}

module.exports = enoughCheck
