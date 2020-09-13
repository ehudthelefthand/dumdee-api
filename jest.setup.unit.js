require('dotenv').config({ path: './.test.unit.env' })

jest.mock('./src/services/transaction', () => {
    return (cb) => {
        return cb('session')
    }
})