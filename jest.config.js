const defaultConfig = require('./jest.config.common')

module.exports = {
  ...defaultConfig,
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/__tests__/**/*.test.[jt]s'],
  testPathIgnorePatterns: ['integration', 'dist'],
  collectCoverageFrom: ['**/*.(t|j)s'],
}
