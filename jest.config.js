module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/src', '<rootDir>/__tests__/frontend', '<rootDir>/__tests__/backend'],
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    testPathIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: {
      '\\.(css)$': 'identity-obj-proxy',
    },
  };
  