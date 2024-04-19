const express = require('express');

const {organizationRatingController} = require('../controller/orgRatingController')

const router = express.Router();

router.get('/rating' ,organizationRatingController )

module.exports = router

