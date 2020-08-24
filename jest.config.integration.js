module.exports = {
    verbose: true,
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./jest.setup.integration.js'],
    testRegex: ['/integration/']
}