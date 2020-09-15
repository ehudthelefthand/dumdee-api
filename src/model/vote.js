const mongoose = require('mongoose')
const coffeeRepository = require('../repository/coffee.repository')
const coffee = require('./coffee')

const voteSchema = new mongoose.Schema({})

module.exports = mongoose.model('vote', voteSchema)