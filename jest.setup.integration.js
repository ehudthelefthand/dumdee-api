const { connect, disconnect, clearDB } = require('./src/database')

beforeAll(async () => {
    try {
        await connect()
    } catch (err) {
        throw err
    }
})

beforeEach(async () => {
    try {
        await clearDB()
    } catch (err) {
        throw err
    }
})

afterAll(async () => {
    try {
        await disconnect()
    } catch (err) {
        throw err
    }
})
