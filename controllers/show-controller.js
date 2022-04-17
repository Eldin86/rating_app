const fs = require('fs')
const Show = require('../models/show-model')
const Cast = require('../models/cast-model')
const AppError = require('../services/appError')
const Paginate = require('../services/paginate')
const catchAsync = require('../services/catchAsync')

const cloudinaryImageUpload = require('../services/cloudinary')

exports.getAllMovies = catchAsync(async (req, res, next) => {
    const result = await Paginate(Show.find({category: 'movie'}), req.query, next)
    
    res.status(200).json({
        status: 'success',
        results: result.count,
        data: result.data
    })
})
exports.getShow = catchAsync(async (req, res, next) => {
    const show = await Show.findById(req.params.id).populate('ratings')

    if (!show) {
        const err = new AppError(`Unable to find movie/tv with id: ${req.params.id}`, 404)
        return next(err)
    }
    res.status(200).json({
        status: 'success',
        data: {
            data: show
        }
    })

})

exports.add = catchAsync(async (req, res, next) => {
    
    const { category, overview, release_date, title } = req.body
    console.log('Step 1: category', category)
    let cover
    let obj = {}
    let cast = []
    let folder = './uploads'
    const castFiles = req.files.actor_image;
    const coverFile = req.files.cover[0].path
    const actors = req.body.actor_name

    if (!(category, overview, release_date, title)) {
        const err = new AppError(`Category, overview, release_date, title are required fields`, 400)
        return next(err)
    }

    if (actors.length <= 2) {
        const err = new AppError(`Please add more than 2 actors`, 400)
        return next(err)
    }

    //Upload Cover
    cover = await cloudinaryImageUpload(coverFile, 'cover')

    //Upload Cast
    cast = await Promise.all(actors.map((actor, i) => cloudinaryImageUpload(castFiles[i].path, 'cast').then(res => ({ profile_path: res.res, name: actor }))))//({profile_path: res.res, name: actor[i]})

    console.log('Step 2: cover, cast', cover, cast)

    obj.category = category
    obj.overview = overview
    obj.release_date = release_date
    obj.title = title
    obj.poster_path = cover.res

    const castRes = await  Cast.insertMany(cast)
    obj.cast = castRes

    const showRes = await new Show(obj)

    await showRes.save()

    res.status(200).json({
        status: 'success',
        data: null
    })

    //Delete files from folder after upload
    fs.readdir(folder, (error, files) => {
        if (error) console.log(error)
        for (let file of files) {
            fs.unlinkSync(`${folder}/${file}`)
        }
    })

})

exports.searchShow = catchAsync(async(req, res, next) => {
    const phrase = req.query.keyword
    if(phrase.length < 2){
        return next(new AppError('Please enter more than 2 characters to search.'), 400)
    }

    const result = await Show.find({$text: {$search: phrase}})
    
    if(result.length === 0){
        return next(new AppError(`No results for keyword: ${phrase}`), 400)
    }

    res.status(200).json({
        status: 'success',
        results: result.length,
        data: result
    })
})

exports.getAllTvs = catchAsync(async (req, res, next) => {
    const result = await Paginate(Show.find({category: 'tv'}), req.query, next)
    
    res.status(200).json({
        status: 'succes',
        results: result.count,
        data: result.data
    })
}) 
