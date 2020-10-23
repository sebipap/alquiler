const { string } = require('@hapi/joi')
const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        maxlength: 255,
    },
    post_id: {
        type: String,
        required: true,
        maxlength: 255,
    },
    body: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 4
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
    }
})

module.exports = mongoose.model('Review',reviewSchema)