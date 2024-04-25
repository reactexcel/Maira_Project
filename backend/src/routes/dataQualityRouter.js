const express = require('express');

const { getQualityData , dataLevelCheckController} = require('../controller/dataQualityController')

const router = express.Router();

router.get('/overview' ,getQualityData )
router.post('/datalevel-check/:id' , dataLevelCheckController)


module.exports = router

