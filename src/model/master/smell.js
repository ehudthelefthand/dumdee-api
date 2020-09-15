const mongoose = require('mongoose')

const smellSchema = new mongoose.Schema({
    name: {
        type: String,
    },
})

module.exports = mongoose.model('smell', smellSchema)