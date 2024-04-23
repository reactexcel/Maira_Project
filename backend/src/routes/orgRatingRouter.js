const express = require('express');

const {organizationRatingController , ratingLevelCheck} = require('../controller/orgRatingController')

const router = express.Router();

router.get('/rating' ,organizationRatingController )

router.post('/rating-check' ,ratingLevelCheck )

module.exports = router

