const express = require('express')
const router = express.Router()

const serialPortController = require('../controllers/serialport_controller')

router.post('/write', serialPortController.writeData)

router.get('/getData', serialPortController.getData)

router.get('/testDecode', serialPortController.testDecode)


module.exports = router
