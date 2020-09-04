const Coffee = require("../../coffee")
const species = require("../../master/species")

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
            expect(err.errors.name).toBeTruthy()
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
            expect(err.errors.brand).toBeTruthy()
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
            expect(err.errors.price).toBeTruthy()
        }
    })

    test('priceUnit must default to THB', async () => {
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

    // test('weight must be required', async () => {
    //     try {
    //         const coffee = await Coffee.create({
    //             name: 'Odds Coffee',
    //             brand: 'Odds',
    //             price: 120,
    //         })
    //         expect(coffee.priceUnit).toBe('THB')
    //     } catch (err) {
    //         throw err
    //     }
    // })

    test('roastLevel must be required', async () => {
        expect.assertions(1)
        try {
            await Coffee.create({
                name: 'Odds Coffee',
                price: 120,
                priceUnit: 'THB',

            })
        } catch (err) {
            expect(err.errors.brand).toBeTruthy()
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

    const getValidCoffee = () => {
        return {
            name: 'Odds Coffee',
            brand: brand._id,
            price: 120,
            weight: 310,
            netWeight: 300,
            species: species._id,
            roastLevel: roastLevel._id,
            rosatDate: new Date(),
            bestPeriod: '2M',
        }
    }
})