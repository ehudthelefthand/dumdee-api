const Species = require('../../species')

describe('Species Model', () => {
    test('name must be require', async () => {
        expect.assertions(1)
        try {
            await Species.create({})
        } catch (err) {
            expect(err.errors.name).toBeTruthy()
        }
    })

    test('create species successfully', async () => {
        try {
            await Species.create({
                name: 'Arabica'
            })
        } catch (err) {
            throw err
        }
    })
})