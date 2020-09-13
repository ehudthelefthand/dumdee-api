jest.mock('../../../repository/user.repository')
jest.mock('../../../repository/coffee.repository')
jest.mock('../../../repository/vote.repository')
const userRepo = require('../../../repository/user.repository')
const coffeeRepo = require('../../../repository/coffee.repository')
const voteRepo = require('../../../repository/vote.repository')
const voteService = require('../../vote.service')
const ErrorCode = require('../../../constant/error.code')

describe('Vote Service', () => {

    describe('createVote', () => {

        test('should create vote and update coffee vote', async () => {
            userRepo.getByEmail.mockResolvedValue({ _id: 'userId' })
            const mockCoffeeData = { _id: 'coffeeId' }
            coffeeRepo.getCoffeeById.mockResolvedValue({ ...mockCoffeeData, toObject: () => ({ ...mockCoffeeData })})
            voteRepo.createVote.mockResolvedValue()
            voteRepo.getByCoffeeId.mockResolvedValue([{ score: 4 }, { score: 5 }])
            coffeeRepo.updateCoffee.mockResolvedValue()

            await voteService.createVote({ score: 5, coffeeId: 'coffeeId', email: 'user@email.com' })

            expect(userRepo.getByEmail).toHaveBeenCalledWith('user@email.com')
            expect(coffeeRepo.getCoffeeById).toHaveBeenCalledWith('coffeeId')
            expect(voteRepo.createVote).toHaveBeenCalledWith({ score: 5, coffeeId: 'coffeeId', userId: 'userId' })
            expect(voteRepo.getByCoffeeId).toHaveBeenCalledWith('coffeeId')
            expect(coffeeRepo.updateCoffee).toHaveBeenCalledWith({ _id: 'coffeeId', vote: 4.5 })
        })

        test('should reject when coffee is not found', async () => {
            expect.assertions(1)
            userRepo.getByEmail.mockResolvedValue({ _id: 'userId' })
            coffeeRepo.getCoffeeById.mockResolvedValue(null)
            voteRepo.createVote.mockResolvedValue()
            voteRepo.getByCoffeeId.mockResolvedValue([{ score: 4 }, { score: 5 }])
            coffeeRepo.updateCoffee.mockResolvedValue()

            try {
                await voteService.createVote({ score: 5, coffeeId: 'coffeeId', email: 'user@email.com' })
            } catch (err) {
                expect(err).toEqual(ErrorCode.COFFEE_NOT_FOUND)
            }
        })

    })

})