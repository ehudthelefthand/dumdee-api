const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
    },
})

module.exports = mongoose.model('menu', menuSchema)