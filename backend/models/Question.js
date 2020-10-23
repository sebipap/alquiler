const { string } = require('@hapi/joi')
const mongoose = require('mongoose')
const questionSchema = new mongoose.Schema({
    post_id: {
        type: String,
        required: true,
        maxlength: 255,
    },
    user_id: {
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
    answer: {
        type: String,
        maxlength: 255,
        minlength: 4
    }

})

module.exports = mongoose.model('Question',questionSchema)