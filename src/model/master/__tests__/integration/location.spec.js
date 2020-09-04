const Location = require('../../location')

describe('Location Model', () => {
    test('country must be require', async () => {
        expect.assertions(1)
        try {
            await Location.create({
                province: 'Chiang Rai'
            })
        } catch (err) {
            expect(err.errors.country).toBeTruthy()
        }
    })

    test('province must be require', async () => {
        expect.assertions(1)
        try {
            await Location.create({
                country: 'Thailand',
            })
        } catch (err) {
            expect(err.errors.province).toBeTruthy()
        }
    })

    test('create location successfully', async() => {
        try {
            await Location.create({
                province: 'Chiang Rai',
                country: 'Thailand',
            })
        } catch (err) {
            throw err
        }
    })
})