require('dotenv').config() // bring in .env
require('./config') // bring in mongoDb
const express = require('express')
const { join } = require('path')
const app = express()

// Middleware
app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('./routes')(app)

app.listen(process.env.PORT || 3001)