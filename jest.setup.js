const { connect, disconnect, clearDB } = require('./src/database')

beforeEach(async () => {
    try {
        await connect()
        await clearDB()
    } catch (err) {
        throw err
    }
})

afterEach(async () => {
    try {
        await disconnect()
    } catch (err) {
        throw err
    }
})