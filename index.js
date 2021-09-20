const express = require('express')
require('./services/passport')
// const keys = require('./config/keys')

const app = express()

// app.get('/', (req, res)=> {
//     res.send({hi: 'what is a youth?'})
// })
require('./routes/authRoutes')(app)
const PORT = process.env.PORT || 5000

app.listen(PORT)