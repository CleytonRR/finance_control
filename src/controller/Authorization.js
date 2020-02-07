module.exports = {
  async private (req, res) {
    try {
      return res.status(200).json({ message: 'Successfully authenticated' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal Error' })
    }
  }
}
