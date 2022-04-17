const Show = require('../models/show-model')
const catchAsync = require('../services/catchAsync')

exports.createRating = catchAsync(async (req, res) => {
    const rating = req.body.rating
    const id = req.params.showId

    const doc = await Show.findById(id)
    
    doc.rating.push({ value: rating})
    
    await doc.save()
    res.status(200).json({
        status: 'success',
        data: 'Thank you for voting!'
    })
})