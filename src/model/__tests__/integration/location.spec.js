const Location = require('../../location')
const Country = require('../../country')

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
            const country = await Country.create({ name: 'Thailand' })
            await Location.create({
                country: country.id,
            })
        } catch (err) {
            expect(err.errors.state).toBeTruthy()
        }
    })

    test('create location successfully', async() => {
        try {
            const country = await Country.create({ name: 'Thailand' })
            await Location.create({
                state: 'Chiang Rai',
                country: country.id,
            })
        } catch (err) {
            throw err
        }
    })
})