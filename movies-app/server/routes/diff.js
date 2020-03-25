const express = require('express')

const NumerCtrl = require('../controllers/numer-ctrl')

const router = express.Router()

router.post('/diff', NumerCtrl.createDiff)
router.get('/diff/:id', NumerCtrl.getDiff)

module.exports = router