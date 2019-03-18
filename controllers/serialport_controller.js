const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

var port = new SerialPort('COM5', {
  baudRate: 9600
})

const parser = new Readline()
port.pipe(parser)
console.log('==== start')

// Read data that is available but keep the stream from entering //"flowing mode"
port.on('readable', function () {
  console.log('DATA: ', port.read().toString())
});

exports.readData = (req, res) => {
  port.on('readable', function () {
    console.log('DATA: ', port.read().toString())
  })

}

exports.writeData = (req, res) => {
  port.open(function () {
    port.write(req.body.text, function (err) {
      if (err) return sendData(500, err.message)

      res.send('message written')
      console.log('==== message written')
    })
  })
}