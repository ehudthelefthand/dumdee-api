const mongoose = require('mongoose')

const processSchema = new mongoose.Schema({
    name: {
        type: String,
    }
})

module.exports = mongoose.model('process', processSchema)