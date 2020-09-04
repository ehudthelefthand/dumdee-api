const Menu = require('../../menu')

describe('Menu Model', () => {
    test('name must be require', async () => {
        expect.assertions(1)
        try {
            await Menu.create({})
        } catch (err) {
            expect(err.errors.name).toBeTruthy()
        }
    })

    test('create menu successfully', async () => {
        try {
            await Menu.create({
                name: 'Latte',
            })
        } catch (err) {
            throw err
        }
    })
})