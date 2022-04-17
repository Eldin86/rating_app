const express = require('express')
const router = express.Router({mergeParams: true})
const ratingController = require('../controllers/rating-controller')

router.post('/', ratingController.createRating)

module.exports = router