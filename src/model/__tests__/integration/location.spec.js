const Location = require('../../location')

describe('Location Model', () => {
    test('name must be require', async () => {
        expect.assertions(1)
        try {
            await Location.create({})
        } catch (err) {
            expect(err).toBeTruthy()
        }
    })
})