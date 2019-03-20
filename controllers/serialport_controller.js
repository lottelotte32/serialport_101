const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const parser = new Readline({ delimiter: '\r\n' })

var THAI_ID_IMGB64 = "";
var THAI_ID_TEXTB64 = "";
var DATA_FROM_DEVICE = "";

const port = new SerialPort(
  'COM3',
  { baudRate: 14400, autoOpen: false },
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

port.on('readable', function () {

  DATA_FROM_DEVICE = port.read().toString()
  var rawBit = DATA_FROM_DEVICE.split(" ")
  THAI_ID_IMGB64 = THAI_ID_IMGB64.concat(rawBit[0]);
  if (rawBit[1] != undefined) {
    THAI_ID_TEXTB64 = THAI_ID_TEXTB64.concat(rawBit[1]);
  }
  console.log("successed:");
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
  THAI_ID_IMGB64 = THAI_ID_IMGB64.replace(/\n/g, "");
  THAI_ID_TEXTB64 = THAI_ID_TEXTB64.replace(/\n/g, "");

  res.status(200).json({ img64: THAI_ID_IMGB64, text64: THAI_ID_TEXTB64 })
  
}


