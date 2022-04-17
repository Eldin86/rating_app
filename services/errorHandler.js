const AppError = require('./appError')
//Invalid id's
const handleCastErrorDB = (error) => {
    const message = `Invalid ${error.path} : ${error.value}`
    return new AppError(message, 400)
}
//general error handler
const errorHandler = (error, req, res) => {
    return res.status(error.statusCode).json({
        status: error.status,
        message: error.message
    })
}
//duplicate entires error handler
const handleDuplicateEntriesDB = (error) => {
    const message = 'This movie/tv already exists!'
    return new AppError(message, 409)
}

//DB validation error
const handleValidationErrorDB = (error) => {
    const errors = Object.values(error.errors).map(el =>el.message)
    const message = `Invalid input data. ${errors.join(' ')}`
    return new AppError(message, 409)
}

module.exports = (err, req, res, next) => {
    let error = Object.create(err)
    
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'error'

    if (err.name === 'CastError') error = handleCastErrorDB(error)
    if(error.code === 11000) error = handleDuplicateEntriesDB(error)
    if(error.name === 'ValidationError') error = handleValidationErrorDB(error)
    errorHandler(error, req, res)
}