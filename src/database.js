const mongoose = require('mongoose')

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/whatever', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

const disconnect = () => {
    return mongoose.disconnect()
}

const clearDB = async () => {
    try {
        for (let i in mongoose.connection.collections) {
            await mongoose.connection.collections[i].deleteMany()
        }
    } catch (err) {
        throw err
    }
}

module.exports = {
    connect, disconnect, clearDB
}