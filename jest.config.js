module.exports = {
    verbose: true,
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./jest.setup.unit.js'],
    testPathIgnorePatterns: ['/integration/'],
    watchPathIgnorePatterns: ['/mongo-volume'],
    restoreMocks: true,
    resetMocks: true,
    clearMocks: true
}