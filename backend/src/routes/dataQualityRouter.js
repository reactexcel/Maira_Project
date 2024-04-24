const express = require('express');

const {getQualityData} = require('../controller/dataQualityController')

const router = express.Router();

router.get('/overview' ,getQualityData )
module.exports = router

