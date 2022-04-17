const AppError = require('./appError')

const Paginate = async (query, queryString, next) => {
    const pageNum = +queryString.page || 1
    const limitResults = +queryString.limit || 5
    const skip = (pageNum - 1) * limitResults
    const count = await query.countDocuments()
    let data = await query.find({}).skip(skip).limit(limitResults)

    if (queryString.page && skip >= count) {
        return next(new AppError('This page does not exists', 404))
    }

    return { data, count }
}

module.exports = Paginate