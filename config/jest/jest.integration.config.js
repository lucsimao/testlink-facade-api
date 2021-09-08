/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const root = resolve(__dirname, '../../');
const rootConfig = require(`${root}/config/jest/jest.config.js`);

module.exports = {
  ...rootConfig,
  ...{
    rootDir: root,
    displayName: 'integration-tests',
    testMatch: ['<rootDir>/**/__integration__/**/*.test.ts'],
    collectCoverage: true,
    collectCoverageFrom: [
      'src/client/**/*.ts',
      '!src/**/*.test.ts',
      '!src/**/module-alias.ts',
      '!src/index.ts',
    ],
  },
};
