const express = require('express')

const NumerCtrl = require('../controllers/numer-ctrl')

const router = express.Router()

router.post('/bisec', NumerCtrl.createBi)
router.get('/bisec/:id', NumerCtrl.getBisection)

module.exports = router