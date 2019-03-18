const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT | 8080
const indexRoute = require('./routes/index')
const usbRoute = require('./routes/usb')

// app.set('view engine', 'ejs')
// app.set('views', 'views')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', indexRoute)

app.listen(PORT, err => {
  if (err) throw err
  console.log(`Server running at Port ${PORT}`)
})
