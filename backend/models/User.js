const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now

    },
    description: {
        type: String,
        required: false,
        min: 6,
        max: 1024
    },
    img_url: {
        type: String,
        required: false,
        min: 6,
        max: 1024
    },


})

module.exports = mongoose.model('User',userSchema)