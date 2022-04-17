const cloudinary = require('cloudinary').v2
const AppError = require('./appError')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

cloudinaryImageUpload = async (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, {
            folder: `${folder}`,
            overwrite: false
        }, (err, res) => {
            if (err) return new AppError('Upload image error', 500)
            resolve({
                res: res.secure_url,
                type: folder
            })
        }
        )
    })
}

module.exports = cloudinaryImageUpload