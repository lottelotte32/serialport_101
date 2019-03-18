const express = require('express')
const router = express.Router()

const serialPortController = require('../controllers/serialport_controller')
// const serialPortController = require('../controllers/serialport_controller')
// const newSerialPortController = require('../controllers/new_serialport_controller')

// router.get('/', newSerialPortController.callDevice)

router.post('/write', serialPortController.writeData)

router.post('/read', serialPortController.readData)

module.exports = router
