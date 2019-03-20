const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT | 8080
const indexRoute = require('./routes/index')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use('/api', indexRoute)

app.listen(PORT, err => {
  if (err) throw err
  console.log(`Server running at Port ${PORT}`)
})
