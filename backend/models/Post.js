const { string } = require('@hapi/joi')
const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        max: 255
    },
    title: {
        type: String,
        required: true,
        max: 255,
        min: 4
    },
    body: {
        type: String,
        max: 2000,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    base_price: {
        type: Number,
        required: true,
        default: 0,
    },
    night_price: {
        type: Number,
        required: true,
    },
    img_url: {
        type: String,
        maxlength: 1000
    }
})

module.exports = mongoose.model('Post',postSchema)