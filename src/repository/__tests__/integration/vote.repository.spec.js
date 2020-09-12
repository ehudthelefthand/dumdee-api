const voteRepo = require('../../vote.repository')
const Vote = require('../../../model/vote')
const User = require('../../../model/user')
const Coffee = require('../../../model/coffee')
const Brand = require('../../../model/brand')
const Species = require('../../../model/master/species')
const RoastLevel = require('../../../model/master/roastLevel')

describe('Vote CRUD', () => {

    let user, coffee;

    beforeAll(async () => {
        try {
            await prepareMaster()
            const data = getValidCoffee()
            coffee = await Coffee.create(data)
            user = await User.create({ email: 'test@mail.com', password: 'password' })
        } catch (err) {
            throw err
        }
    })

    describe('createVote', () => {
        test('should success', async () => {
            try {
                await voteRepo.createVote({ score: 5, userId: user._id, coffeeId: coffee._id })
            } catch (err) {
                throw err
            }
        })
    })

    describe('deleteVote', () => {
        test('should success', async () => {
            try {
                const vote = await voteRepo.createVote({ score: 5, userId: user._id, coffeeId: coffee._id })
                let found = await Vote.findById(vote._id).exec()
                expect(found).toBeTruthy()
                await voteRepo.deleteVote(vote._id)
                found = await Vote.findById(vote._id).exec()
                expect(found).toBeFalsy()
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