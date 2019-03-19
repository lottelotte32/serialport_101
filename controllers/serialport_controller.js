const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const parser = new Readline()

var DATA_FROM_DEVICE = [
  {
    type: '01',
    data: {
      firstname: 'lotte',
      lastname: 'chatechan'
    }
  }
]
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
  // res.status(200).json({success: true})
  port.open(() => {
    port.write(req.body.text, err => {
      if (err) return err.message

      res.status(200).json({success: true})
      console.log('==== message written')
    })
  })
  console.log('COMMAND:', req.body.text)
}

exports.getData = (req, res) => {
  res.status(200).json(DATA_FROM_DEVICE)
}
