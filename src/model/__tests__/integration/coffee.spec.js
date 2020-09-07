const Coffee = require('../../coffee')
const Brand = require('../../brand')
const Species = require('../../master/species')
const RoastLevel = require('../../master/roastLevel')
const Menu = require('../../master/menu')

describe('Coffee Model', () => {

    let brand, species, roastLevel;

    beforeAll(async () => {
        brand = await Brand.create({ name: 'Odds Coffee' })
        species = await Species.create({ name: 'Arabica' })
        roastLevel = await RoastLevel.create({ name: 'Medium' })
    })

    test('name must be required', async () => {
        expect.assertions(1)
        try {
            const data = getValidCoffee()
            delete data.name
            await Coffee.create(data)
        } catch (err) {
            expect(err.errors.name).toBeTruthy()
        }
    })

    test('brand must be required', async () => {
        expect.assertions(1)
        try {
            const data = getValidCoffee()
            delete data.brand
            await Coffee.create(data)
        } catch (err) {
            expect(err.errors.brand).toBeTruthy()
        }
    })

    test('price must be required', async () => {
        expect.assertions(1)
        try {
            const data = getValidCoffee()
            delete data.price
            await Coffee.create(data)
        } catch (err) {
            expect(err.errors.price).toBeTruthy()
        }
    })

    test('priceUnit must default to THB', async () => {
        try {
            const data = getValidCoffee()
            delete data.priceUnit
            const coffee = await Coffee.create(data)
            expect(coffee.priceUnit).toBe('THB')
        } catch (err) {
            throw err
        }
    })

    test('weight must be required', async () => {
        expect.assertions(1)
        try {
            const data = getValidCoffee()
            delete data.weight
            await Coffee.create(data)
        } catch (err) {
            expect(err.errors.weight).toBeTruthy()
        }
    })

    test('netWeight must be required', async () => {
        expect.assertions(1)
        try {
            const data = getValidCoffee()
            delete data.netWeight
            await Coffee.create(data)
        } catch (err) {
            expect(err.errors.netWeight).toBeTruthy()
        }
    })

    test('weight unit must default to GM', async () => {
        try {
            const data = getValidCoffee()
            delete data.weightUnit
            const coffee = await Coffee.create(data)
            expect(coffee.weightUnit).toBe('GM')
        } catch (err) {
            throw err
        }
    })

    test('species must be required', async () => {
        expect.assertions(1)
        try {
            const data = getValidCoffee()
            delete data.species
            await Coffee.create(data)
        } catch (err) {
            expect(err.errors.species).toBeTruthy()
        }
    })

    test('roastLevel must be required', async () => {
        expect.assertions(1)
        try {
            const data = getValidCoffee()
            delete data.roastLevel
            await Coffee.create(data)
        } catch (err) {
            expect(err.errors.roastLevel).toBeTruthy()
        }
    })

    test('roastDate must be required', async () => {
        expect.assertions(1)
        try {
            const data = getValidCoffee()
            delete data.roastDate
            await Coffee.create(data)
        } catch (err) {
            expect(err.errors.roastDate).toBeTruthy()
        }
    })

    test('bestPeriod must be required', async () => {
        expect.assertions(1)
        try {
            const data = getValidCoffee()
            delete data.bestPeriod
            await Coffee.create(data)
        } catch (err) {
            expect(err.errors.bestPeriod).toBeTruthy()
        }
    })

    test('beanSampleImage must be required', async () => {
        expect.assertions(1)
        try {
            const data = getValidCoffee()
            delete data.beanSampleImage
            await Coffee.create(data)
        } catch (err) {
            expect(err.errors.beanSampleImage).toBeTruthy()
        }
    })

    test('create coffee successfully', async () => {
        try {
            await Coffee.create(getValidCoffee())
        } catch (err) {
            throw err
        }
    })

    test('create coffee with array of subdocument', async () => {
        try {
            const latte = await Menu.create({ name: 'latte' })
            const mocha = await Menu.create({ name: 'mocha' })
            const data = getValidCoffee()
            data.menus = [latte._id, mocha._id]
            const coffee = await Coffee.create(data)
            const result = await Coffee.findById(coffee._id).populate('menus').exec()
            expect(result.menus.map(m => m.name)).toEqual(['latte', 'mocha'])
        } catch (err) {
            throw err
        }
    })

    const getValidCoffee = () => {
        return {
            name: 'Odds Coffee',
            beanSampleImage: 'sample.png',
            brand: brand._id,
            price: 120,
            weight: 310,
            netWeight: 300,
            species: species._id,
            roastLevel: roastLevel._id,
            roastDate: new Date(),
            bestPeriod: '2M',
        }
    }
})