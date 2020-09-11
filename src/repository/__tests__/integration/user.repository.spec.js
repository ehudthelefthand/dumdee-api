const userRepo = require('../../user.repository')

describe('User Repository', () => {
    describe('createUser', () => {
        test('should return user of a given email', async () => {
            try {
                await userRepo.createUser('test@mail.com', 'password')
            } catch (err) {
                throw err
            }
        })
    })

    describe('getUserByEmail', () => {
        test('should return user of a given email', async () => {
            try {
                await userRepo.createUser('test@mail.com', 'password')
                const found = await userRepo.getByEmail('test@mail.com')
                expect(found).toBeTruthy()
            } catch (err) {
                throw err
            }
        })
    })
})