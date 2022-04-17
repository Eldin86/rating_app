const multer = require('multer')

const multerStorage = multer.memoryStorage()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        cb(null, `${file.fieldname === 'cover' ? 'cover' : 'actor_image'}-${Date.now()}.${ext}`)
    }
})

const multerFilter = (req, file, cb) => {
    //Check if file is image
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error('Not an image! Please upload only images.'), false)
    }
}
const upload = multer({
    storage: storage,
    fileFilter: multerFilter
})

exports.uploadShowImages = upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'actor_image' }
])