const passport = require('passport')
const express = require('express')
const router = express()

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
}))


router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: `/login`,
}), (req, res) => {
    res.redirect(`/movie`)
})

router.get('/logout', (req, res) => {
    req.session = null
    req.logout()
    res.redirect(`/movie`)
})

router.get('/current_user', (req, res) => {
    if (req.user) {
        res.status(200).json({
            status: 'success',
            data: req.user,
        })
    }
})

module.exports = router
