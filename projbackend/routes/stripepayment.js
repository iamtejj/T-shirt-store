const express = require('express');
const router = express.Router();

const { makepayment } = require('../controllers/stripepayment')

router.use('/stripepayment',makepayment)

module.exports = router;