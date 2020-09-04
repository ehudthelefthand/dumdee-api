const mongoose = require('mongoose')

const roastLevelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('roastLevel', roastLevelSchema)