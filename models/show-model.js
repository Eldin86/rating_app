const mongoose = require('mongoose')
const { Schema } = mongoose
const ObjectId = mongoose.Types.ObjectId

const ratingSchema = new Schema({
    value: {
        type: Number,
        min: 1,
        max: 10
    }
})

const showSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title can not be empty.'],
        trim: true
    },
    poster_path: {
        type: String,
        required: [true, 'Cover can not be empty.'],
        trim: true
    },
    overview: {
        type: String,
        required: [true, 'Description can not be empty.'],
        trim: true,
    },
    release_date: {
        type: Date,
        default: Date.now(),
        required: [true, 'Release date can not be empty.']
    },
    category: {
        type: String,
        trim: true,
        required: [true, 'Please provide category']
    },
    rating: [ratingSchema],
    ratingsAverage: {
        type: Number,
        min: [1, 'Rating must be 1 or above 1'],//make changes to this validation
        max: [10, 'Rating must be 10 or below 10'],
        default: 1,
        set: val => Math.round(val * 10) / 10 //Round number
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    cast: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Cast'
        }
    ]
}, {
    //If no virtuals remove this objects
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

showSchema.index({title: 'text', overview: 'text'})

showSchema.statics.calcAverateRating = async function (showId) {
    const stats = await this.aggregate([
        {
            $match: {
                _id: ObjectId(`${showId}`)
            }
        },
        {
            $unwind: { path: "$rating" }
        },
        {
            $group: {
                _id:  null,
                nRatings: {$sum: 1},
                avgRating: { $avg: "$rating.value" }
            }
        }
    ])

    let statsRatingsAverage, statsRatingsQuantity

    if (stats.length > 0) {
        statsRatingsAverage = stats[0].avgRating
        statsRatingsQuantity = stats[0].nRatings
    } else {
        statsRatingsAverage = 1
        statsRatingsQuantity = 0
    }

    await this.findByIdAndUpdate(showId, {
        $set: {
            ratingsAverage: statsRatingsAverage,
            ratingsQuantity: statsRatingsQuantity
        }
    })
}

showSchema.post('save', async function () {
    this.constructor.calcAverateRating(this.id)
})

//Populate cast on find
showSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'cast',
        select: '-__v'
    })
    next()
})

module.exports = mongoose.model('Show', showSchema)