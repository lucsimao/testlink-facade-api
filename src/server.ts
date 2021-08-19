import './util/module-alias';

import * as OpenApiValidator from 'express-openapi-validator';

import { Application, json } from 'express';

import { BuildController } from '@src/controllers/builds';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { Server } from '@overnightjs/core';
import { TestCaseController } from '@src/controllers/testCases';
import { TestPlanController } from '@src/controllers/testPlans';
import { TestProjectController } from '@src/controllers/testProjects';
import { TestSuiteController } from '@src/controllers/testSuites';
import apiSchema from '@src/api.schema.json';
import http from 'http';
import logger from './logger';
import swaggerUi from 'swagger-ui-express';

export class SetupServer extends Server {
  private server?: http.Server;

  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    await this.setupExpress();
  }

  private async setupExpress(): Promise<void> {
    this.app.use(json());
    await this.docsSetup();
    this.setupControllers();
  }

  private setupControllers() {
    this.addControllers([
      new TestProjectController(),
      new BuildController(),
      new TestCaseController(),
      new TestProjectController(),
      new TestPlanController(),
      new TestSuiteController(),
    ]);
  }

  public getApp(): Application {
    return this.app;
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      logger.info('Server listening on port: ' + this.port);
    });
  }

  private async docsSetup(): Promise<void> {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSchema));
    this.app.use(
      await OpenApiValidator.middleware({
        apiSpec: apiSchema as OpenAPIV3.Document,
        validateRequests: true,
        validateResponses: true,
      })
    );
  }
}
