require('dotenv').config()
const app = require('./index')

app.listen(process.env.PORT || 3333)
