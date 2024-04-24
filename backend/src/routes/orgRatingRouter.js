const express = require('express');

const {organizationRatingController , ratingLevelCheck , ratingGraph} = require('../controller/orgRatingController')

const router = express.Router();

router.get('/rating' ,organizationRatingController )
router.post('/rating-check' ,ratingLevelCheck )
router.get('/rating-graph' , ratingGraph )

module.exports = router

