# Testlink Facade Api

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

# Techs

- [Node.js](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)- Text editor with following plugins installed: [DotENV](https://github.com/mikestead/vscode-dotenv), [ESLint](https://github.com/Microsoft/vscode-eslint), [GitLens](https://github.com/eamodio/vscode-gitlens) e [vscode-icons](https://github.com/vscode-icons/vscode-icons).
- [Overnight](https://github.com/seanpmaxwell/overnight/tree/master) - TypeScript decorators for [Express](https://github.com/expressjs/express).
- [Jest](https://jestjs.io/) - Javascript Test Framework.
- [ESLint](https://github.com/eslint/eslint) - ESLint to padronize the project code.
- [Docker Compose](https://docs.docker.com/compose/) - Virtualization Tool container based.
- [Testlink (Docker)](https://hub.docker.com/r/bitnami/testlink/) - Docker image for [Testlink](https://testlink.org/)
- [MariaDB (Docker)](https://hub.docker.com/_/mariadb) - Mariadb oficial image for [Mariadb Database](https://mariadb.org/)

# References

- [Testlink](https://testlink.org/)
- [Waldemar Neto - DO ZERO A PRODUÇÃO: APRENDA A CONSTRUIR UMA API NODE.JS COM TYPESCRIPT ](https://github.com/waldemarnt/node-typescript-api)
- [Glaucia Lemos - Curso Typescript Zero To Hero](https://github.com/glaucia86/curso-typescript-zero-to-hero)
- [Alura - Formação Node JS](https://cursos.alura.com.br/formacao-node-js-12)
