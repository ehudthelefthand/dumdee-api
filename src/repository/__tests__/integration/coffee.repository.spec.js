const coffeeService = require('../../../model/coffee.service')

describe('Coffee CRUD', () => {
    describe.skip('createCoffee', () => {
        test('create coffee should be success', async () => {
            try {
                const data = {
                    name: 'Odds Coffee',
                    brand: 'Odds',
                    price: 120,
                    priceUnit: 'THB',
                    reviews: [],
                }
                const {_id, __v, ...coffee} = (await coffeeService.createCoffee(data)).toObject()
                expect(coffee).toEqual(data)
            } catch (err) {
                throw err
            }
        })
    })
})