const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    googleId:{
        type: String,
        select: false
    },
    secret: {
        type: String,
        select: false
    },
    email: String,
    avatar: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User