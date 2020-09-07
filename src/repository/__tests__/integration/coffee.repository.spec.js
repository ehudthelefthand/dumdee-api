const coffeeRepository = require('../../../repository/coffee.repository')
const Brand = require('../../../model/brand')
const Species = require('../../../model/master/species')
const RoastLevel = require('../../../model/master/roastLevel')
const Menu = require('../../../model/master/menu')
const Process = require('../../../model/master/process')
const Smell = require('../../../model/master/smell')
const Make = require('../../../model/master/make')
const Coffee = require('../../../model/coffee')
const { clearDB } = require('../../../database')

describe('Coffee CRUD', () => {

    describe('createCoffee', () => {
        test('should be success', async () => {
            try {
                await clearDB()
                await prepareMaster()
                const data = getValidCoffee()
                const coffee = (await coffeeRepository.createCoffee(data)).toObject()
                expect(coffee.name).toEqual('Odds Coffee')
            } catch (err) {
                throw err
            }
        })
    })

    describe('updateCoffee', () => {
        test('should be success', async () => {
            try {
                await clearDB()
                await prepareMaster()
                const data = getValidCoffee()
                const coffee = await coffeeRepository.createCoffee(data)
                const updated = await coffeeRepository.updateCoffee({ _id: coffee._id, name: 'Odds Coffee Updated' })
                expect(updated.name).toEqual('Odds Coffee Updated')
                expect(updated._id).toEqual(coffee._id)
            } catch (err) {
                throw err
            }
        })
    })


    describe('getCoffeeById', () => {
        test('should be success', async () => {
            try {
                await clearDB()
                await prepareMaster()
                const data = getValidCoffee()
                const coffee = await coffeeRepository.createCoffee(data)
                const found = await coffeeRepository.getCoffeeById(coffee._id)
                expect(found._id).toEqual(coffee._id)
                expect(found.name).toEqual('Odds Coffee')
            } catch (err) {
                throw err
            }
        })
    })


    describe('getCoffee', () => {

        test('should default sort by name ASC', async () => {
            try {
                await clearDB()
                await prepareMaster()
                let b = getValidCoffee()
                b.name = 'Coffee B'
                await coffeeRepository.createCoffee(b)

                let a = getValidCoffee()
                a.name = 'Coffee A'
                await coffeeRepository.createCoffee(a)

                const found = await coffeeRepository.getCoffee()
                expect(found.length).toEqual(2)
                expect(found[0].name).toEqual('Coffee A')
                expect(found[1].name).toEqual('Coffee B')
            } catch (err) {
                throw err
            }
        })

        test('should default limit to 20', async () => {
            try {
                await clearDB()
                await prepareMaster()
                for (let i = 0; i < 30; i++) {
                    let data = getValidCoffee()
                    data.name = `Coffee ${i}`
                    await coffeeRepository.createCoffee(data)
                }
                const page1 = await coffeeRepository.getCoffee()
                expect(page1.length).toEqual(20)
                const page2 = await coffeeRepository.getCoffee({ page: 2 })
                expect(page2.length).toEqual(10)
            } catch (err) {
                throw err
            }
        })

        describe('filter', () => {

            let strong, latte, honey, drip, mango, arabica

            beforeAll(async () => {
                try {
                    await clearDB()
                    await prepareMaster()
                    strong = await RoastLevel.create({ name: 'Strong' })
                    latte = await Menu.create({ name: 'Latte' })
                    honey = await Process.create({ name: 'Honey' })
                    drip = await Make.create({ name: 'Drip' })
                    mango = await Smell.create({ name: 'Mango' })
                    arabica = await Species.create({ name: 'Arabica' })

                    let attr_2 = getValidCoffee()
                    attr_2.roastLevel = strong._id
                    attr_2.species = arabica._id

                    let attr_3 = getValidCoffee()
                    attr_3.roastLevel = strong._id
                    attr_3.species = arabica._id
                    attr_3.menus = [latte._id]

                    let attr_4 = getValidCoffee()
                    attr_4.roastLevel = strong._id
                    attr_4.species = arabica._id
                    attr_4.menus = [latte._id]
                    attr_4.process = honey._id

                    let attr_5 = getValidCoffee()
                    attr_5.roastLevel = strong._id
                    attr_5.species = arabica._id
                    attr_5.menus = [latte._id]
                    attr_5.process = honey._id
                    attr_5.makes = [drip._id]

                    let attr_6 = getValidCoffee()
                    attr_6.roastLevel = strong._id
                    attr_6.species = arabica._id
                    attr_6.menus = [latte._id]
                    attr_6.process = honey._id
                    attr_6.makes = [drip._id]
                    attr_6.smell = mango._id

                    await Coffee.create([
                        attr_2,
                        attr_3,
                        attr_4,
                        attr_5,
                        attr_6,
                    ])
                } catch (err) {
                    throw err
                }
            })

            test('should filter by roast level', async () => {
                try {
                    const match = await coffeeRepository.getCoffee({ roastLevel: [strong._id] })
                    expect(match.length).toEqual(5)
                } catch (err) {
                    throw err
                }
            })

            test('should filter by species', async () => {
                try {
                    const match = await coffeeRepository.getCoffee({ species: [arabica._id] })
                    expect(match.length).toEqual(5)
                } catch (err) {
                    throw err
                }
            })

            test('should filter by menus', async () => {
                try {
                    const match = await coffeeRepository.getCoffee({ menus: [latte._id] })
                    expect(match.length).toEqual(4)
                } catch (err) {
                    throw err
                }
            })


            test('should filter by process', async () => {
                try {
                    const match = await coffeeRepository.getCoffee({ process: [honey._id] })
                    expect(match.length).toEqual(3)
                } catch (err) {
                    throw err
                }
            })

            test('should filter by make', async () => {
                try {
                    const match = await coffeeRepository.getCoffee({ makes: [drip._id] })
                    expect(match.length).toEqual(2)
                } catch (err) {
                    throw err
                }
            })

            test('should filter by smell', async () => {
                try {
                    const match = await coffeeRepository.getCoffee({ smell: [mango._id] })
                    expect(match.length).toEqual(1)
                } catch (err) {
                    throw err
                }
            })


            test('should allow filter mix', async () => {
                try {
                    const match = await coffeeRepository.getCoffee({
                        roastLevel: [strong._id],
                        menus: [latte._id],
                        process: [honey._id],
                        makes: [drip._id],
                        smell: [mango._id],
                        species: [arabica._id]
                    })
                    expect(match.length).toEqual(1)
                } catch (err) {
                    throw err
                }
            })

        })
    })

    describe('deleteCoffee', () => {
        test('should be success', async () => {
            try {
                await clearDB()
                await prepareMaster()
                const data = getValidCoffee()
                const coffee = await coffeeRepository.createCoffee(data)
                await coffeeRepository.deleteCoffee(coffee._id)
                const found = await coffeeRepository.getCoffeeById(coffee._id)
                expect(found).toBeNull()
            } catch (err) {
                throw err
            }
        })
    })

    let brand, species, roastLevel;

    const prepareMaster = async () => {
        brand = await Brand.create({ name: 'Odds Coffee' })
        species = await Species.create({ name: 'Arabica' })
        roastLevel = await RoastLevel.create({ name: 'Medium' })
    }

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