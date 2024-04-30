const express = require('express');

const { getQualityData , dataLevelCheckController, getDataAnalytics, dataQualityVariable} = require('../controller/dataQualityController')

const router = express.Router();

router.get('/overview' ,getQualityData )
router.get('/variable-list', dataQualityVariable);
router.put('/datalevel-check/:id' , dataLevelCheckController)


router.get('/data-analytics' ,getDataAnalytics)
module.exports = router

