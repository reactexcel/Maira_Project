const express = require('express');

const { getQualityData , dataLevelCheckController, getDataAnalytics, dataQualityVariable, dataAnalyticsDropdown} = require('../controller/dataQualityController')

const router = express.Router();

router.get('/overview' ,getQualityData )
router.get('/variable-list', dataQualityVariable);
router.put('/datalevel-check/:id' , dataLevelCheckController)
router.put('/data-matrix/:id', dataAnalyticsDropdown)


router.get('/data-analytics' ,getDataAnalytics)
module.exports = router

