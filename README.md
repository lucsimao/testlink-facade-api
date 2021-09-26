# Testlink Facade Api

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT) [![Workflow](https://github.com/lucsimao/testlink-facade-api/actions/workflows/full-workflow.yml/badge.svg)](https://github.com/lucsimao/testlink-facade-api/actions/workflows/full-workflow.yml) [![codecov](https://codecov.io/gh/lucsimao/testlink-facade-api/branch/master/graph/badge.svg?token=S02C34WGQ3)](https://codecov.io/gh/lucsimao/testlink-facade-api)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Flucsimao%2Ftestlink-facade-api%2F/master)](https://dashboard.stryker-mutator.io/reports/github.com/lucsimao/testlink-facade-api/master)

Testlink facade API that provides some features to Testlink integration

# Summary

- [Requirements](#Requirements)
- [Installation](#Installation)
- [Test](#Test)
- [Techs](#Techs)
- [References](#References)

# Testlink

[TestLink](https://github.com/TestLinkOpenSourceTRMS/testlink-code) is a web based test management and test execution system. It enables quality assurance teams to create and manage their test cases as well as to organize them into test plans. These test plans allow team members to execute test cases and track test results dynamically.

# Requirements

To create a mysqldump for this project database run:
`docker exec -it mariadb-testlink mysqldump -u root bitnami_testlink > ./config/mariadb/dump.sql`

To recover the dump run:
`docker exec mariadb-testlink mysql -u root bitnami_testlink < ./config/mariadb/dump.sql`

# Installation

To install this project, run the following commands:
`git clone https://github.com/lucsimao/testlink-facade-api`

- For npm users
  `npm install`
  `npm start`

- For yarn users:
  `yarn install`
  `yarn start`

# Test

To execute this project tests, you must run the following commands:

- **Unit Tests**
  `npm run test:unit`
  or
  `yarn test:unit`

- **Functional Tests**
  `npm run test:functional`
  or
  `yarn test:functional`

- **Lint**
  `npm run lint`
  or
  `yarn lint`

- **Style Check**
  `npm run style:check`
  `npm run style:fix`
  or
  `yarn style:check`
  `yarn style:fix`

- **All Tests**
  `npm test`
  or
  `yarn test`

# Documentation

For view this [Swagger Api](https://swagger.io/), start the local server with the following commands:

`yarn install`
`yarn start:local`

then access then [/docs route](http://localhost:3000/docs)

`http://localhost:3000/docs`

# Techs

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/githubactions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/VisualStudioCode-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

In this project, we used the following technologies:

- [Node.js](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)- Text editor with following plugins installed: [DotENV](https://github.com/mikestead/vscode-dotenv), [ESLint](https://github.com/Microsoft/vscode-eslint), [GitLens](https://github.com/eamodio/vscode-gitlens) e [vscode-icons](https://github.com/vscode-icons/vscode-icons).
- [Overnight](https://github.com/seanpmaxwell/overnight/tree/master) - TypeScript decorators for [Express](https://github.com/expressjs/express).
- [Jest](https://jestjs.io/) - Javascript Test Framework.
- [ESLint](https://github.com/eslint/eslint) - ESLint to padronize the project code.
- [Prettier](https://prettier.io/) - To format code automatically.
- [Docker Compose](https://docs.docker.com/compose/) - Virtualization Tool container based.
- [Testlink (Docker)](https://hub.docker.com/r/bitnami/testlink/) - Docker image for [Testlink](https://testlink.org/)
- [MariaDB (Docker)](https://hub.docker.com/_/mariadb) - Mariadb oficial image for [Mariadb Database](https://mariadb.org/)
- [XMLRPC-testlink](https://www.npmjs.com/package/testlink-xmlrpc) - Testlink XMLRPC module
- [Swagger](https://swagger.io/) - for Api Documentation.
- [Husky](https://github.com/typicode/husky) - To force tests and lint when committing and pushing.
- [Joi](https://joi.dev/) - to validate models schemas.
- [Codecov](https://codecov.io) - to generate _Jest_ badge report.
- [Stryker](https://stryker-mutator.io/docs/General/dashboard/) - To run mutation tests in project and use mutation badges.

# References

- [Testlink](https://testlink.org/)
- [Waldemar Neto - DO ZERO A PRODUÇÃO: APRENDA A CONSTRUIR UMA API NODE.JS COM TYPESCRIPT ](https://github.com/waldemarnt/node-typescript-api)
- [Glaucia Lemos - Curso Typescript Zero To Hero](https://github.com/glaucia86/curso-typescript-zero-to-hero)
- [Alura - Formação Node JS](https://cursos.alura.com.br/formacao-node-js-12)
- [NodeJS Integration Test Best Practices](https://github.com/testjavascript/nodejs-integration-tests-best-practices)
- [NodeJS Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Javascript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
