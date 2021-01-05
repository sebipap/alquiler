const { string } = require('@hapi/joi')
const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        max: 255
    },
    body: {
        type: String,
        max: 2000,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    year: {
        type: Number,
        required: true,
    },
    km: {
        type: Number,
        required: true,
    },
    make: {
        type: String,
        required: true,
        max: 255,
        min: 1
    },
    model: {
        type: String,
        required: true,
        max: 255,
        min: 4
    },
    img_url: {
        type: String,
        maxlength: 1000
    }
})

module.exports = mongoose.model('Post',postSchema)