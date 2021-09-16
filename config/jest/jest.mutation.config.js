/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { resolve } = require('path');
const root = resolve(__dirname, '../../');
const unitConfig = require(`${root}/config/jest/jest.unit.config.js`);

const { displayName, testMatch, ...parentConfig } = unitConfig;

module.exports = {
  ...parentConfig,
  ...{
    rootDir: root,
    displayName: 'mutation-tests',
    testMatch: ['**/__unit__/**/*.test.ts'],
  },
};
