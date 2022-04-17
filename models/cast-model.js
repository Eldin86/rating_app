const mongoose = require('mongoose')
const { Schema } = mongoose

const castSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide name of actor']
    },
    profile_path: {
        type: String
    }
})

module.exports = mongoose.model('Cast', castSchema)