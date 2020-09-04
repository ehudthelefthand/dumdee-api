const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('location', locationSchema)