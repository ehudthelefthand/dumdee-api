const mongoose = require('mongoose')

const awardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('award', awardSchema)