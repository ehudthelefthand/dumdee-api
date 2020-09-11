const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    coffeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coffee',
        required: true,
    }
})

module.exports = mongoose.model('vote', voteSchema)