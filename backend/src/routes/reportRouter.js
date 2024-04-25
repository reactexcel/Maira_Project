const express = require('express');

const {reportController} = require('../controller/reportController')

const router = express.Router();

router.get('/report-data' , reportController )


module.exports = router