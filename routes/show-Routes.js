const express = require('express')
const router = express.Router()
const showController = require('../controllers/show-controller')
const multerConfig = require('../services/multerConfig')
const { isLoggedIn, isAdmin } = require('../middleware/auth')
const ratingRouter = require('./rating-Routes')


router.use('/:showId/rating', isLoggedIn, ratingRouter)

router.get('/tv', showController.getAllTvs)

router.post('/add', isLoggedIn, isAdmin, multerConfig.uploadShowImages, showController.add)

router.get('/search', showController.searchShow)
router.get('/movie', showController.getAllMovies)
router.get('/:id', showController.getShow)


module.exports = router