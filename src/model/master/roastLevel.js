const mongoose = require('mongoose')

const roastLevelSchema = new mongoose.Schema({
    name: {
        type: String,
    },
})

module.exports = mongoose.model('roastLevel', roastLevelSchema)