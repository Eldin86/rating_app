const express = require('express')
const path = require('path')
const passport = require('passport')
const connectDB = require('./database/db')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const showRoutes = require('./routes/show-Routes')
const ratingRoutes = require('./routes/rating-Routes')
const authRoutes = require('./routes/auth-Routes')
const AppError = require('./services/appError')
const globalErrorHandler = require('./services/errorHandler')
const cookieSession = require('cookie-session')
require('./services/passport')

const PORT = process.env.PORT || 5000
connectDB()

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION, SHUTTING DOWN....')
    console.log(err.name, err.message)
    process.exit(1)
})


app.use(express.static(path.join(__dirname, "client", "build")))

app.use(express.json())

app.use(cookieSession({
    name: 'session',
    maxAge: 4 * 24 * 60 * 60 * 1000,
    keys: [`${process.env.COOKIE_KEY}`]
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: `${process.env.HOST}`,
    credentials: true
}))

app.use('/api/v1/rating', ratingRoutes)
app.use('/api/v1/show', showRoutes)
app.use('/', authRoutes)

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

app.listen(PORT, console.log(`Server is running on port ${PORT}`))