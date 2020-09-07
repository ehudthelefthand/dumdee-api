const Brand = require('../../brand')
const Award = require('../../master/award')
const { clearDB } = require('../../../database')

describe('Brand Model', () => {
    test('name must be required', async () => {
        expect.assertions(1)
        try {
            await Brand.create({})
        } catch (err) {
            expect(err.errors.name).toBeTruthy()
        }
    })

    test('create brand successfully', async () => {
        try {
            await Brand.create({
                name: 'Odds Coffee',
            })
        } catch (err) {
            throw err
        }
    })

    test('create brand with awards', async () => {
        try {
            await clearDB()
            const award1 = await Award.create({ name: 'Award1', date: new Date() })
            const award2 = await Award.create({ name: 'Award2', date: new Date() })
            const data = {
                name: 'Odds Coffee',
                awards: [award1._id, award2._id]
            }
            await Brand.create(data)
            const brand = await Brand.findOne({ name: 'Odds Coffee' }).populate('awards').exec()
            expect(brand.awards.map(a => a.name)).toEqual(['Award1', 'Award2'])
        } catch (err) {
            throw err
        }
    })
})