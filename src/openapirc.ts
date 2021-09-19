import path from 'path';

export default {
  cwd: path.resolve(__dirname, '..'),
  extension: ['.ts', '.js', '.yaml', '.yml'],
  include: ['**/**'],
  exclude: [
    'coverage/**',
    'packages/*/test{,s}/**',
    '**/*.d.ts',
    'test{,s}/**',
    'test{,-*}.{js,cjs,mjs,ts,tsx,jsx,yaml,yml}',
    '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx,yaml,yml}',
    '**/__tests__/**',
    '**/{ava,babel,nyc}.config.{js,cjs,mjs}',
    '**/jest.config.{js,cjs,mjs,ts}',
    '**/{karma,rollup,webpack}.config.js',
    '**/.{eslint,mocha}rc.{js,cjs}',
    '**/.{travis,yarnrc}.yml',
    '**/{docker-compose}.yml',
  ],
  excludeNodeModules: true,
  verbose: false,
  throwLevel: 'off',
};
