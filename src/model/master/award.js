const mongoose = require('mongoose')

const awardSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    date: {
        type: Date,
    }
})

module.exports = mongoose.model('award', awardSchema)