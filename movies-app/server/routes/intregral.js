const express = require('express')

const NumerCtrl = require('../controllers/numer-ctrl')

const router = express.Router()

router.post('/intre', NumerCtrl.createIntre)
router.get('/intre/:id', NumerCtrl.getIntre)

module.exports = router