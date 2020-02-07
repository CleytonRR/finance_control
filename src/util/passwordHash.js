const bcript = require('bcrypt')

class PassHash {
  static async generatorHash (password) {
    const saltsRounds = 10
    const hash = await bcript.hash(password, saltsRounds)
    return hash
  }

  static async compareHash (password, hash) {
    const result = await bcript.compare(password, hash)
    return result
  }
}

module.exports = PassHash
