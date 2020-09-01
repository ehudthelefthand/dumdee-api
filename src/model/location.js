const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'country',
        required: true
    },
})

module.exports = mongoose.model('location', locationSchema)