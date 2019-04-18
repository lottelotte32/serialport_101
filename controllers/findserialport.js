var SerialPort = require("serialport")
const Readline = require('@serialport/parser-readline')
const parser = new Readline({ delimiter: '\r\n' })

var THAI_ID_IMGB64 = "";
var THAI_ID_TEXTB64 = "";
var DATA_FROM_DEVICE = "";
var VID_PID = [
    { vendorId: '2FB8', productId: '2116' },
    { vendorId: '2FB8', productId: '21A6' }
]
var portList = []
async function findPort() {
    await SerialPort.list(function (err, ports) {
        
        portList = ports[i]


    })
}

function openSerialPort(port) {
    port = new SerialPort(port,
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
}
findPort().then(() => {
    for (var i = 0; i < VID_PID.length; i++) {
        if (VID_PID[i].vendorId === portList.vendorId && VID_PID[i].productId === portList.productId) {
            openSerialPort(portList.comName)
        }
    }

})
if (portList === []) {
    console.log(portList.comName)

}
exports.writeData = (req, res) => {
    port.open(() => {
        port.write(req.body.text, (err, result) => {
            console.log('Err:' + err)
            console.log('Result:' + result)
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
//920
// { comName: 'COM14',
//   manufacturer: 'Microsoft',
//   serialNumber: '0820702805',
//   pnpId: 'USB\\VID_2FB8&PID_2116&MI_04\\6&D8AA40&0&0004',
//   locationId: '0000.0014.0000.002.000.000.000.000.000',
//   vendorId: '2FB8',
//   productId: '2116' }

//930
// { comName: 'COM3',
//   manufacturer: 'Microsoft',
//   serialNumber: '1170002162',
//   pnpId: 'USB\\VID_2FB8&PID_21A6&MI_02\\6&34B0D6AF&0&0002',
//   locationId: '0000.0014.0000.002.000.000.000.000.000',
//   vendorId: '2FB8',
//   productId: '21A6' }



