const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const parser = new Readline()

var DATA_FROM_DEVICE = null

const port = new SerialPort(
  'COM3',
  { baudRate: 9600, autoOpen: false },
  err => {
    if (err) return console.log('Error: ', err.message)
    console.log('New port')
  }
)
port.pipe(parser)

port.open(err => {
  if (err) return console.log('Error opening port: ', err.message)
})
port.on('open', () => {
  console.log('==OPEN PORT==')
})

// Read data that is available but keep the stream from entering //"flowing mode"
port.on('readable', function() {
  DATA_FROM_DEVICE = port.read().toString()
  console.log('DATA: ', DATA_FROM_DEVICE)
})

exports.writeData = (req, res) => {
  port.open(() => {
    port.write(req.body.text, err => {
      if (err) return err.message

      res.send('message written')
      console.log('==== message written')
    })
  })
}

exports.getData = (req, res) => {
  res.json({ data: DATA_FROM_DEVICE })
}
