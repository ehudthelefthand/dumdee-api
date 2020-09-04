const Brand = require('../../brand')

describe('Brand Model', () => {
    test('name must be required', async () => {
        expect.assertions(1)
        try {
            await Brand.create({})
        } catch (err) {
            expect(err.errors.name).toBeTruthy()
        }
    })

    test('create brand successfully', async () => {
        try {
            await Brand.create({
                name: 'Odds Coffee',
            })
        } catch (err) {
            throw err
        }
    })
})