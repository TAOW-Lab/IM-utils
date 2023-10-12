global.Buffer = require('buffer').Buffer;
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.spec.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/types/**/*.ts',
  ],
  globals: {
    'ts-jest': {
      diagnostics: false,
      isolatedModules: true,
      Buffer,
    },
  },
  moduleNameMapper: {
    "axios": "axios/dist/node/axios.cjs",
  },
  setupFiles: [
    require.resolve("buffer/"),
    require.resolve("crypto-browserify"),
  ],
};



