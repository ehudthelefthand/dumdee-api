const mongoose = require('mongoose')

const makeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
})

module.exports = mongoose.model('make', makeSchema)