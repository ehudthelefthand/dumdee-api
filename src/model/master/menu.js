const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('menu', menuSchema)