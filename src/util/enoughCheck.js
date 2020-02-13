class enoughCheck {
  static check (userValor, valorDay) {
    if (valorDay >= userValor / 30) {
      return true
    } else {
      return false
    }
  }
}

module.exports = enoughCheck
