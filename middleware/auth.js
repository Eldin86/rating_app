const AppError = require('../services/appError')

exports.isLoggedIn = (req, res, next) => {
    if (!req.user) {
        return next( new AppError('You are not logged in. Please login', 401))
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next( new AppError('You do not have permision to perform this action', 401))
    }
    next()
}