const Smell = require('../../smell')

describe('Smell Model', () => {
    test('name must be require', async () => {
        expect.assertions(1)
        try {
            await Smell.create({})
        } catch (err) {
            expect(err.errors.name).toBeTruthy()
        }
    })

    test('create smell successfully', async () => {
        try {
            await Smell.create({
                name: 'Mango',
            })
        } catch (err) {
            throw err
        }
    })
})