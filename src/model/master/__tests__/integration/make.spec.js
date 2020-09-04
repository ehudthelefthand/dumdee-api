const Make = require('../../make')

describe('Make Model', () => {
    test('name must be require', async () => {
        expect.assertions(1)
        try {
            await Make.create({})
        } catch (err) {
            expect(err.errors.name).toBeTruthy()
        }
    })

    test('create make successfully', async () => {
        try {
            await Make.create({
                name: 'Drip',
            })
        } catch (err) {
            throw err
        }
    })
})