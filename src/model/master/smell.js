const mongoose = require('mongoose')

const smellSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('smell', smellSchema)