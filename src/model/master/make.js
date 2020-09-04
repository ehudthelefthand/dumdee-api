const mongoose = require('mongoose')

const makeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('make', makeSchema)