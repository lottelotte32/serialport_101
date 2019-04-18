const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const parser = new Readline({ delimiter: '\r\n' })

var THAI_ID_IMGB64 = "";
var THAI_ID_TEXTB64 = "";
var DATA_FROM_DEVICE = "";
// var clear = require('clear');

const port = new SerialPort(
  'COM10',
  { baudRate: 128000, autoOpen: false }
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
  console.log(THAI_ID_IMGB64)

  if (rawBit[1] != undefined) {
    THAI_ID_TEXTB64 = THAI_ID_TEXTB64.concat(rawBit[1]);
    console.log(THAI_ID_TEXTB64)
  }
})

exports.writeData = (req, res) => {
  port.open(() => {
    port.write(req.body.text, (err,result) => {
      console.log('Err:'+err)
      console.log('Result:'+result)    
      res.send('message written')
    })
  })
}

exports.getData = (req, res) => {
  THAI_ID_IMGB64 = THAI_ID_IMGB64.replace(/\n/g, "");
  THAI_ID_TEXTB64 = THAI_ID_TEXTB64.replace(/\n/g, "");
  res.status(200).json({ img64: THAI_ID_IMGB64, text64: THAI_ID_TEXTB64 })

  THAI_ID_IMGB64 = "";
  THAI_ID_TEXTB64 = "";
  DATA_FROM_DEVICE = "";
  rawBit = ""
  console.log('clear')

}
// clear();


