const RoastLevel = require('../../roastLevel')

describe('RoastLevel Model', () => {
    test('name must be require', async () => {
        expect.assertions(1)
        try {
            await RoastLevel.create({})
        } catch (err) {
            expect(err.errors.name).toBeTruthy()
        }
    })

    test('create roast level successfully', async () => {
        try {
            await RoastLevel.create({
                name: 'Medium',
            })
        } catch (err) {
            throw err
        }
    })
})