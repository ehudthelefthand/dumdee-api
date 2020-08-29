const Location = require('../../location')

describe('Location Model', () => {
    test('country must be require', async () => {
        expect.assertions(1)
        try {
            await Location.create({
                state: 'Chiang Rai'
            })
        } catch (err) {
            expect(err.errors.country).toBeTruthy()
        }
    })

    test('state must be require', async () => {
        expect.assertions(1)
        try {
            await Location.create({
                country: 'Thailand'
            })
        } catch (err) {
            expect(err.errors.state).toBeTruthy()
        }
    })
})