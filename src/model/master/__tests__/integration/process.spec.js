const Process = require('../../process')

describe('Process Model', () => {
    test('name must be require', async () => {
        expect.assertions(1)
        try {
            await Process.create({})
        } catch (err) {
            expect(err.errors.name).toBeTruthy()
        }
    })

    test('create process successfully', async () => {
        try {
            await Process.create({
                name: 'Honey',
            })
        } catch (err) {
            throw err
        }
    })
})