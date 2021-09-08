/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const root = resolve(__dirname, '../../');
const rootConfig = require(`${root}/config/jest/jest.config.js`);

module.exports = {
  ...rootConfig,
  ...{
    rootDir: root,
    displayName: 'functional-tests',
    setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
    testMatch: ['<rootDir>/test/**/*.test.ts'],
    collectCoverage: true,
    collectCoverageFrom: [
      'src/controllers/**/*.ts',
      '!src/**/*.test.ts',
      '!src/**/module-alias.ts',
      '!src/index.ts',
    ],
  },
};
