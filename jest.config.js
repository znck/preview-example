const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('../tsconfig.json')

module.exports = {
  rootDir: __dirname,
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/test/e2e/'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  setupFilesAfterEnv: ['<rootDir>/test/unit/setupTest.ts'],
  globals: {
    'ts-jest': {
      packageJson: '<rootDir>/package.json',
    },
  },
  displayName: {
    name: 'App',
    color: 'cyan',
  },
}
