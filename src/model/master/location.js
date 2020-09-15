const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    province: {
        type: String,
    },
    country: {
        type: String,
    },
})

module.exports = mongoose.model('location', locationSchema)