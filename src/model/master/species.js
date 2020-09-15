const mongoose = require('mongoose')

const speciesSchema = new mongoose.Schema({
    name: {
        type: String,
    },
})

module.exports = mongoose.model('species', speciesSchema)