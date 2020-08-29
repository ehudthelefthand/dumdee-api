const Country = require('../../country')

describe('Country Model', () => {
    test('name must be require', async () => {
        expect.assertions(1)
        try {
            await Country.create({})
        } catch (err) {
            expect(err.errors.name).toBeTruthy()
        }
    })
})