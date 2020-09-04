const mongoose = require('mongoose')

const processSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('process', processSchema)