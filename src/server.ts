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
import http from 'http';
import logger from './logger';
import openapi from 'openapi-comment-parser';
import openapiConfig from './openapirc';
import rateLimiterMiddleware from './middlewares/rateLimiterMiddleware';
import swaggerUi from 'swagger-ui-express';

const apiSchema = openapi(openapiConfig);
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
    this.setupRateLimiter();
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

  private setupRateLimiter() {
    this.app.use(rateLimiterMiddleware());
  }

  public getApp(): Application {
    return this.app;
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      logger.info({ msg: 'Server listening on port: ' + this.port });
    });
  }

  public async close(): Promise<void> {
    await new Promise((resolve, reject) => {
      this.server?.close((err) => {
        return err ? reject(err) : resolve(true);
      });
      return resolve(true);
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
