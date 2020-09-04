const Award = require('../../award')

describe('Award Model', () => {
    test('name must be require', async () => {
        expect.assertions(1)
        try {
            await Award.create({
                date: new Date()
            })
        } catch (err) {
            expect(err).toBeTruthy()
        }
    })

    test('date must be require', async () => {
        expect.assertions(1)
        try {
            await Award.create({
                name: 'Test'
            })
        } catch (err) {
            expect(err).toBeTruthy()
        }
    })

    test('create award successfully', async () => {
        try {
            await Award.create({
                name: 'Award Test',
                date: new Date(),
            })
        } catch (err) {
            throw err
        }
    })
})