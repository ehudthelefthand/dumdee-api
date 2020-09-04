const Award = require('../../award')

describe('Award Model', () => {
    test('name must be require', async () => {
        expect.assertions(1)
        try {
            await Award.create({})
        } catch (err) {
            expect(err).toBeTruthy()
        }
    })

    test('create award successfully', async () => {
        try {
            await Award.create({
                name: 'Award Test',
            })
        } catch (err) {
            throw err
        }
    })
})