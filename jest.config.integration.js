module.exports = {
    verbose: true,
    testEnvironment: 'node',
    setupFiles: ["dotenv/config"],
    setupFilesAfterEnv: ['./jest.setup.integration.js'],
    testRegex: ['/integration/']
}