const Coffee = require("../../coffee")

describe('Coffee Model', () => {

    test('name must be required', async () => {
        expect.assertions(1)
        try {
            await Coffee.create({
                price: 60,
                priceUnit: 'THB',
                brand: 'Odds',
            })
        } catch (err) {
            expect(err).toBeTruthy()
        }
    })

    test('price must be required', async () => {
        expect.assertions(1)
        try {
            await Coffee.create({
                name: 'Odds Coffee',
                brand: 'Odds',
                priceUnit: 'THB',
            })
        } catch (err) {
            expect(err).toBeTruthy()
        }
    })

    test('priceUnit should be default to THB', async () => {
        try {
            const coffee = await Coffee.create({
                name: 'Odds Coffee',
                brand: 'Odds',
                price: 120,
            })
            expect(coffee.priceUnit).toBe('THB')
        } catch (err) {
            throw err
        }
    })

    test('brand must be required', async () => {
        expect.assertions(1)
        try {
            await Coffee.create({
                name: 'Odds Coffee',
                price: 120,
                priceUnit: 'THB',
            })
        } catch (err) {
            expect(err).toBeTruthy()
        }
    })

    test.skip('create coffee successfully', async () => {
        try {
            const { _id, __v, ...coffee } = (await Coffee.create({
                name: 'Odds Coffee',
                brand: 'Odds',
                price: 120
            })).toObject()

            expect(_id).toBeDefined()
            expect(coffee).toEqual({
                name: 'Odds Coffee',
                brand: 'Odds',
                price: 120,
                priceUnit: 'THB',
                reviews: []
            })
        } catch (err) {
            throw err
        }
    })
})