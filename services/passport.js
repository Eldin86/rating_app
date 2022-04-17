const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const dotenv = require('dotenv')

const User = require('../models/user-model')
dotenv.config()

//Google config options
passport.use(new GoogleStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id })
    //Check if user exists
    //Prevent 2 same users to save into DB
    if (existingUser) {
        return done(null, existingUser)
    } else {
        const newUser = await new User({
            googleId: profile.id,
            username: profile.displayName,
            name: profile._json.given_name,
            email: profile._json.email,
            avatar: profile._json.picture
        }).save()
        
        return done(null, newUser)
    }

}))

passport.serializeUser(function (user, done) {
    done(null, user.id)
})
passport.deserializeUser(async function (id, done) {
    const user = await User.findById(id)
    done(null, user)
})